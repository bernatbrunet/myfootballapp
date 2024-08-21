const db = require("../config/database");

exports.getAllTeams = async (req, res) => {
    try {
        const [rows] = await db.getPromisePool().execute("SELECT * FROM teams");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error obtenint equips" });
    }
};

exports.createTeam = async (req, res) => {
    try {
        const { name, country } = req.body;
        if (!name || !country) {
            return res.status(400).json({ error: "Falten camps requerits" });
        }
        const [result] = await db.getPromisePool().execute("INSERT INTO teams (name, country) VALUES (?, ?)", [name, country]);
        res.status(201).json({ id: result.insertId, name, country });
    } catch (error) {
        res.status(500).json({ error: "Error creant equip" });
    }
};

exports.getTeamById = async (req, res) => {
    try {
        const [rows] = await db.getPromisePool().execute("SELECT * FROM teams WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Equip no trobat" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error obtenint equip" });
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const { name, country } = req.body;
        if (!name || !country) {
            return res.status(400).json({ error: "Falten camps requerits" });
        }
        const [result] = await db.getPromisePool().execute("UPDATE teams SET name = ?, country = ? WHERE id = ?", [name, country, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Equip no trobat" });
        }
        res.status(200).json({ id: req.params.id, name, country });
    } catch (error) {
        res.status(500).json({ error: "Error actualitzant equip" });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        // Primero, eliminar todos los jugadores asociados a este equipo
        await db.getPromisePool().execute("DELETE FROM players WHERE teamId = ?", [req.params.id]);
        
        // Luego, eliminar el equipo
        const [result] = await db.getPromisePool().execute("DELETE FROM teams WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Equip no trobat" });
        }
        res.status(204).send();  // Respuesta 204 para eliminación exitosa
    } catch (error) {
        console.error("Error eliminant equip:", error);
        res.status(500).json({ error: "Error eliminant equip" });
    }
};