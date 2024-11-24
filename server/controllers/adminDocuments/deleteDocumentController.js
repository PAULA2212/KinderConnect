// Importa el servicio de conexión a la base de datos
const promisePool = require('../../services/database');

// Define la función deleteDocument que maneja las solicitudes de eliminación de documentos
const deleteDocument = async (req, res) => {
    // Extrae el id y el tipo de los parámetros de la solicitud
    const { id, type } = req.params;
    let query; // Variable para almacenar la consulta SQL

    // Definir la consulta SQL en función del tipo
    if (type === "educador") {
        // Si el tipo es 'educador', se prepara una consulta para eliminar un documento en la tabla 'documentos'
        query = "DELETE FROM documentos WHERE id_doc = ?";
    } else if (type === "kid") {
        // Si el tipo es 'kid', se prepara una consulta para eliminar un documento en la tabla 'documentos_niños'
        query = "DELETE FROM documentos_niños WHERE id_doc = ?";
    } else {
        // Si el tipo no es válido, devuelve un error con el estado 400 (Bad Request)
        return res.status(400).json({ message: "Tipo no válido" });
    }

    try {
        // Ejecuta la consulta SQL, pasando el id como parámetro
        await promisePool.query(query, [id]);
        // Si la consulta se ejecuta correctamente, devuelve un mensaje de éxito
        res.status(204).json({ message: 'Documento borrado exitosamente' });
    } catch (error) {
        // Manejo de errores: si ocurre un error al ejecutar la consulta, se registra el error en la consola
        console.log('Error al borrar el documento', error);
        // Devuelve un mensaje de error con el estado 500 (Internal Server Error)
        res.status(500).json({ message: 'Error al borrar el documento' });
    }
}

// Exporta la función deleteDocument para su uso en otras partes de la aplicación
module.exports = deleteDocument;
