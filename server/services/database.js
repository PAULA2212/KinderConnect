
require('dotenv').config(); // Cargar variables de entorno desde .env
const mysql = require('mysql2');

// Configuración de las credenciales de la base de datos usando variables de entorno
const credentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool(credentials);
const promisePool = pool.promise();

module.exports = promisePool;