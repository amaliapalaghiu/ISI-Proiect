const pool = require('../../db');

const getExpeditorbyUserId = (req, res) => {
    const userId = parseInt(req.params.id);
    pool.query("SELECT * FROM expeditori WHERE userID = $1", [userId],  (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getCereri = (req, res) => {
    const userID = req.params.id;
    pool.query("SELECT C.tip_marfa, C.masa, C.volum, C.data_plecarii, C.data_max_plecarii, C.locul_plecarii, C.data_sosirii, C.data_max_sosirii, C.locul_sosirii, C.buget \
                FROM cereri C JOIN expeditori T ON T.expeditorID = \
                C.expeditorID WHERE T.userID=$1", [userID], 
                (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const addCerere = async(req, res) => {
    const {userid, tip_marfa, masa, volum, data_plecarii, data_max_plecarii, locul_plecarii, data_sosirii, data_max_sosirii, locul_sosirii, buget} = req.body;
    
    await pool.query("SELECT expeditorid FROM expeditori WHERE userid=$1", [userid], (error, results) => {
        if (error) throw error;

        pool.query("INSERT INTO cereri(expeditorid, tip_marfa, masa, volum, data_plecarii, \
            data_max_plecarii, locul_plecarii, data_sosirii, data_max_sosirii, locul_sosirii, buget) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
            [results.rows[0].expeditorid,tip_marfa, masa, volum, data_plecarii, data_max_plecarii, locul_plecarii, data_sosirii, data_max_sosirii, locul_sosirii, buget], 
                    (error, resultss) => {
            if (error) throw error;

            res.status(201).json(resultss.rows);
        })
    })
};

module.exports = {
    getExpeditorbyUserId,
    getCereri,
    addCerere
}