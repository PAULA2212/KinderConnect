// Cargar las variables de entorno desde un archivo .env
require('dotenv').config();

// Importar el módulo mysql2 para gestionar conexiones a MySQL
const mysql = require('mysql2');

// Configuración de las credenciales de la base de datos utilizando variables de entorno
const credentials = {
    host: process.env.DB_HOST, // Dirección del host de la base de datos
    user: process.env.DB_USER, // Usuario de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña del usuario
    database: process.env.DB_NAME // Nombre de la base de datos a la que conectarse
};

// Crear un pool de conexiones a la base de datos para manejar múltiples conexiones de manera eficiente
const pool = mysql.createPool(credentials);

// Convertir el pool en un pool de promesas para facilitar el uso de async/await en las consultas
const promisePool = pool.promise();

// Exportar el pool de promesas para que pueda ser utilizado en otras partes de la aplicación
module.exports = promisePool;
