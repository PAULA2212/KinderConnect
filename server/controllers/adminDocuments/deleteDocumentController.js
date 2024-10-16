const promisePool = require('../../services/database')

const deleteDocument = async (req, res) => {
    const {id, type} = req.params
    let query;
     // Definir la consulta SQL en función del tipo
     if (type === "educador") {
        // Obtener documentos de niños relacionados con un educador
        query = "DELETE FROM documentos WHERE id_doc = ?";
    } else if (type === "kid") {
        // Obtener documentos relacionados con un niño
        query = "DELETE FROM documentos_niños WHERE id_doc = ?";
    } else {
        return res.status(400).json({ message: "Tipo no válido" }); // Devuelve un error si el tipo no es válido
    }
    try{
        await promisePool.query(query, [id])
            res.status(200).json({ message: 'Documento borrado exitosamente' });
    }catch (error){
        console.log('Error al borrar el documento', error)
        res.status(500).json({ message: 'Error al borrar el documento' });
    }
}

module.exports = deleteDocument;