const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10
};

if (process.env.NODE_ENV === "test") {
    dbConfig.host = process.env.TEST_DB_HOST;
    dbConfig.port = process.env.TEST_DB_PORT;
    dbConfig.user = process.env.TEST_DB_USER;
    dbConfig.password = process.env.TEST_DB_PASSWORD;
    dbConfig.database = process.env.TEST_DB_DATABASE;
}

const pool = mysql.createPool(dbConfig);
const promisePool = pool.promise();

module.exports = {
    getPool: () => pool,
    getPromisePool: () => promisePool
};