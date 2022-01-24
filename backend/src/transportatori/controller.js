const pool = require('../../db');
const moment= require('moment');

const getTransportatori = (req, res) => {
    pool.query("SELECT * FROM transportatori", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getOffers = (req, res) => {
    const userID = req.params.id;
    pool.query("SELECT C.tip_camion, C.volum, C.latime, C.lungime, C.inaltime, C.greutate, \
                Cr.data_plecarii + interval '1 day' as data_plecarii, Cr.locul_plecarii, \
                Cr.data_sosirii + interval '1 day' as data_sosirii, Cr.locul_sosirii, \
                Cr.pret_km_gol, Cr.pret_km_incarcat FROM camion C JOIN transportatori T ON T.transportatorid = \
                C.transportatorid JOIN curse Cr ON C.camionID = Cr.camionID WHERE T.userID=$1 \
                AND data_sosirii >= CURRENT_DATE", [userID], 
                (error, results) => {
        if (error) throw error;
        for(i = 0; i < results.rows.length; i++) {
            results.rows[i].data_plecarii = moment(results.rows[i].data_plecarii).utc().format('DD-MM-YYYY');
            results.rows[i].data_sosirii = moment(results.rows[i].data_sosirii).utc().format('DD-MM-YYYY');
        }
        res.status(200).json(results.rows);
    })
};

const addOffer = async(req, res) => {
    const {nr_inmatriculare, data_plecarii, locul_plecarii, data_sosirii, locul_sosirii,  pret_km_gol, pret_km_incarcat} = req.body;

    await pool.query("SELECT camionid FROM camion WHERE tip_camion=$1", [nr_inmatriculare], (error, results) => {
        if (error) throw error;

        pool.query("INSERT INTO curse(camionid, data_plecarii, locul_plecarii, data_sosirii, \
            locul_sosirii, pret_km_gol, pret_km_incarcat) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [results.rows[0].camionid, data_plecarii, locul_plecarii, data_sosirii, locul_sosirii,  pret_km_gol, pret_km_incarcat], (error, resultss) => {
            if (error) throw error;

            res.status(201).json(resultss.rows);
            })
    })
};

const getTrucks = (req, res) => {
    const userID = req.params.id;
    pool.query("SELECT C.tip_camion, C.volum, C.latime, C.lungime, C.inaltime, C.greutate \
                FROM camion C JOIN transportatori T ON T.transportatorid = \
                C.transportatorid WHERE T.userID=$1", [userID], 
                (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getTrucksAvailable = async(req, res) => {
    const {userID, data_plecarii_dorita, data_sosirii_dorita} = req.query;

    await pool.query("select C.tip_camion from camion C JOIN transportatori T ON T.transportatorid = \
                    C.transportatorid WHERE T.userID=$1 AND C.camionid not in \
                    (select Cr.camionid from curse Cr where $2 BETWEEN Cr.data_plecarii AND \
                    Cr.data_sosirii or $3 BETWEEN Cr.data_plecarii AND Cr.data_sosirii);",
                [userID, data_plecarii_dorita, data_sosirii_dorita],
                (error, results) => {
        if (error) throw error;
        for (i = 0; i < results.rows.length; i++) {
            results.rows[i] = results.rows[i].tip_camion;
        }
        res.status(200).json(results.rows);
    })
};

const addTruck = async(req, res) => {
    const {userid, tip_camion, volum, latime, lungime, inaltime, greutate} = req.body;
    
    await pool.query("SELECT transportatorid FROM transportatori WHERE userid=$1", [userid], (error, results) => {
        if (error) throw error;

        pool.query("INSERT INTO camion(transportatorid, tip_camion, volum, latime, \
            lungime, inaltime, greutate, disponibilitate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [results.rows[0].transportatorid, tip_camion, volum, latime, lungime, inaltime, greutate, 'disponibil'], 
                    (error, resultss) => {
            if (error) throw error;

            res.status(201).json(resultss.rows);
        })
    })
};

const getListaCereriClienti = (req, res) => {
    pool.query("SELECT tip_marfa, masa, volum, data_plecarii + interval '1 day' as data_plecarii,\
                data_max_plecarii + interval '1 day' as data_max_plecarii, locul_plecarii, \
                data_sosirii + interval '1 day' as data_sosirii, data_max_sosirii + interval '1 day'\
                as data_max_sosirii, locul_sosirii, buget FROM cereri WHERE (data_max_plecarii + 1) >= CURRENT_DATE", [], 
                (error, results) => {
        if (error) throw error;

        for(i = 0; i < results.rows.length; i++) {
            results.rows[i].data_plecarii = moment(results.rows[i].data_plecarii).utc().format('DD-MM-YYYY');
            results.rows[i].data_max_plecarii = moment(results.rows[i].data_max_plecarii).utc().format('DD-MM-YYYY');
            results.rows[i].data_sosirii = moment(results.rows[i].data_sosirii).utc().format('DD-MM-YYYY');
            results.rows[i].data_max_sosirii = moment(results.rows[i].data_max_sosirii).utc().format('DD-MM-YYYY');
        }
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getTransportatori,
    getOffers,
    addOffer,
    getTrucks,
    addTruck,
    getListaCereriClienti,
    getTrucksAvailable
}