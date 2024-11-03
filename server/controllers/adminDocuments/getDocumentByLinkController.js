// Importa el servicio de conexión a la base de datos
const promisePool = require('../../services/database');

// Define la función getDocumentByLink que maneja las solicitudes para obtener documentos por un enlace
const getDocumentByLink = async (req, res) => {
    // Extrae el id y el tipo de los parámetros de la solicitud
    const { id, type } = req.params;
    console.log("entra en getDocument"); // Log para indicar que se ha entrado en la función

    let query; // Variable para almacenar la consulta SQL

    // Definir la consulta SQL en función del tipo
    if (type === "educador") {
        // Si el tipo es 'educador', se prepara una consulta para obtener documentos de niños relacionados con un educador
        query = "SELECT * FROM documentos_niños WHERE id_niño IN (SELECT id_niño FROM educadores_niños WHERE id_educador = ?)";
    } else if (type === "kid") {
        // Si el tipo es 'kid', se prepara una consulta para obtener documentos relacionados a un niño
        query = "SELECT * FROM documentos WHERE id_educador IN (SELECT id_educador FROM educadores_niños WHERE id_niño = ?)";
    } else {
        // Si el tipo no es válido, devuelve un error con el estado 400 (Bad Request)
        return res.status(400).json({ message: "Tipo no válido" });
    }

    try {
        // Ejecuta la consulta SQL, pasando el id como parámetro y obteniendo las filas resultantes
        const [rows] = await promisePool.query(query, [id]);
        // Verifica si no se encontraron documentos
        if (rows.length === 0) {
            // Si no hay resultados, devuelve un error 404 (Not Found)
            return res.status(404).json({ message: 'No se encontraron documentos' });
        }
        // Devuelve las filas resultantes con un estado 200 (OK)
        res.status(200).json(rows);
    } catch (error) {
        // Manejo de errores: si ocurre un error al ejecutar la consulta, se registra el error en la consola
        console.error('Error en la consulta a la base de datos:', error);
        // Devuelve un mensaje de error con el estado 500 (Internal Server Error)
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Exporta la función getDocumentByLink para su uso en otras partes de la aplicación
module.exports = getDocumentByLink;
