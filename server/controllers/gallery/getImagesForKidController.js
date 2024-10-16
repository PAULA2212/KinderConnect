const promisePool = require('../../services/database');

const getImagesForKid = async (req, res) => {

    const {idKid} = req.params;
    console.log('ID del niño recibido:', idKid);

    try{
        const [images] = await promisePool.query('SELECT * FROM multimedia WHERE id_niño = ? ORDER BY fecha_subida DESC', [idKid]);
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
};

module.exports = getImagesForKid;
