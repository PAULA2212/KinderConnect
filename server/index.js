const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/index');
require('dotenv').config();
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET);



app.use(cors());
app.use(bodyParser.json()); // Para parsear JSON
app.use('/api', router)


app.listen(4000, () => console.log('Servidor escuchando en el puerto 4000'));


