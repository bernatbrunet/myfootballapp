CREATE DATABASE IF NOT EXISTS futbol;
USE futbol;

-- Desactivar la verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 0;

-- Si las tablas ya existen, se eliminan para evitar conflictos con la nueva estructura
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS leagues;

-- Volver a activar la verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- Creación de tablas
CREATE TABLE IF NOT EXISTS leagues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL  -- Asegurarse de que el campo country no pueda ser nulo
);

CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    teamId INT,
    FOREIGN KEY (teamId) REFERENCES teams(id)
);

-- Desactivar la verificación de claves foráneas nuevamente
SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar las tablas antes de insertar datos nuevos
TRUNCATE TABLE players;
TRUNCATE TABLE teams;
TRUNCATE TABLE leagues;

-- Volver a activar la verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- Insertar datos necesarios para los tests

-- Insertar ligas
INSERT INTO leagues (id, name) VALUES (999, 'Test League 999');

-- Insertar equipos con el campo country
INSERT INTO teams (id, name, country) VALUES (999, 'Test Team 999', 'Spain');

-- Insertar jugadores
INSERT INTO players (id, name, teamId) VALUES 
(999, 'Test Player 999', 999);