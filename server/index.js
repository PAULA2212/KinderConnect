// Importa el módulo de Express, que se usa para construir el servidor y definir rutas y middlewares
const express = require('express');

// Importa el módulo CORS, que permite que el servidor acepte peticiones desde otros dominios
const cors = require('cors');

// Importa el módulo body-parser, necesario para interpretar y gestionar datos en formato JSON enviados en el cuerpo de las solicitudes
const bodyParser = require('body-parser');

// Crea una instancia de Express, que es el servidor en sí mismo
const app = express();

// Importa el archivo de rutas principal, que contiene las rutas definidas para esta aplicación
const router = require('./routes/index');

// Carga las variables de entorno desde un archivo .env, útil para almacenar credenciales y configuraciones sin exponerlas en el código
require('dotenv').config();

// Aplica el middleware CORS a toda la aplicación, permitiendo que cualquier dominio acceda a las rutas de este servidor
app.use(cors());

// Usa body-parser para transformar los datos del cuerpo de las solicitudes en objetos JSON accesibles desde req.body
app.use(bodyParser.json()); // Para parsear JSON

// Define el prefijo '/api' para todas las rutas en el router importado; todas las rutas en `router` estarán bajo `/api`
app.use('/api', router);

// Inicia el servidor en el puerto 4000 y muestra un mensaje en la consola cuando el servidor está activo y escuchando
app.listen(4000, () => console.log('Servidor escuchando en el puerto 4000'));
