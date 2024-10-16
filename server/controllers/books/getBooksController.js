const promisePool = require('../../services/database');

const getBooks = async (req, res) => {
    try{
        const [books] = await promisePool.query('SELECT * FROM libros ORDER BY id_registro DESC');
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
};

module.exports = getBooks