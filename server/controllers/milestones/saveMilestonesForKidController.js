const promisePool = require('../../services/database');

const saveMilestonesForKid = async (req, res) => {
    const { idKid, id_hito, edad_conseguida } = req.body;

    console.log(`Received request to save milestone: idKid=${idKid}, id_hito=${id_hito}, edad_conseguida=${edad_conseguida}`); // Log the incoming request

    try {
        // Log the SQL query and the values being inserted
        console.log('Executing query:', 'INSERT INTO hitos_niños (id_niño, id_hito, edad_observado) VALUES (?, ?, ?)', [idKid, id_hito, edad_conseguida]);
        
        const [result] = await promisePool.query(
          'INSERT INTO hitos_niños (id_niño, id_hito, edad_observado) VALUES (?, ?, ?)',
          [idKid, id_hito, edad_conseguida]
        );

        console.log(`Milestone saved successfully: insertId=${result.insertId}`); // Log success

        res.status(201).json({ message: 'Milestone saved successfully', insertId: result.insertId });
    } catch (error) {
        console.error('Error saving milestone for kid:', error); // Log the error
        res.status(500).json({ error: 'Error saving milestone for kid' });
    }
}

module.exports = saveMilestonesForKid;
