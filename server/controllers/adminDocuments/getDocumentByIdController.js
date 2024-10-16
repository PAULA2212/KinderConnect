const promisePool = require('../../services/database');

const getDocumentById = async (req, res) => {
    const { id, type } = req.params;
    console.log("entra en getDocument");

    let query;

    // Definir la consulta SQL en función del tipo
    if (type === "educador") {
        query = "SELECT * FROM documentos WHERE id_educador = ?";
    } else if (type === "kid") {
        query = "SELECT * FROM documentos_niños WHERE id_niño = ?";
    } else {
        return res.status(400).json({ message: "Tipo no válido" }); // Devuelve un error si el tipo no es válido
    }

    try {
        const [rows] = await promisePool.query(query, [id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getDocumentById;
