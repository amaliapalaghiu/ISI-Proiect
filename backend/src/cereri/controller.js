const pool = require('../../db');

const getCereri = (req, res) => {
    pool.query("SELECT * FROM cereri", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const addCereri = async(req, res) => {
    const {expeditorID, tip_marfa, masa, volum, data_plecarii, data_max_plecarii, locul_plecarii, data_sosirii, data_max_sosirii, locul_sosirii, buget} = req.body;
    await pool.query("INSERT INTO cereri(expeditorID, tip_marfa, masa, volum, data_plecarii, data_max_plecarii, locul_plecarii, data_sosirii, data_max_sosirii, locul_sosirii, buget) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
            [expeditorID, tip_marfa, masa, volum, data_plecarii, data_max_plecarii, locul_plecarii, data_sosirii, data_max_sosirii, locul_sosirii, buget], (error, results) => {
            if (error) throw error;
            res.status(201).json({ message: 'Cerere adaugata cu succes!'});
            })
};

module.exports = {
    getCereri,
    addCereri
}