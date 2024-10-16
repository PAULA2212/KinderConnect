const promisePool = require('../../services/database');


const getDevelopmentalMilestones = async (req, res) =>{
    try{
        const [rows] = await promisePool.query('SELECT * FROM hitos_desarrollo ORDER BY edad_esperada');
        res.json(rows);
    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Error retrieving milestones' });
    }
}

module.exports = getDevelopmentalMilestones