const pool = require('../../db');

const getTransportatori = (req, res) => {
    pool.query("SELECT * FROM transportatori", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getOffers = (req, res) => {
    const userID = req.params.id;
    pool.query("SELECT C.tip_camion, C.volum, C.latime, C.lungime, C.inaltime, C.greutate, \
                Cr.data_plecarii, Cr.locul_plecarii, Cr.data_sosirii, Cr.locul_sosirii, \
                Cr.pret_km_gol, Cr.pret_km_incarcat FROM camion C JOIN transportatori T ON T.transportatorid = \
                C.transportatorid JOIN curse Cr ON C.camionID = Cr.camionID WHERE T.userID=$1", [userID], 
                (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getTransportatori,
    getOffers
}