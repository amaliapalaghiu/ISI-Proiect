const pool = require('../../db');

const getExpeditorbyUserId = (req, res) => {
    const userId = parseInt(req.params.id);
    pool.query("SELECT expeditorid, firstname, lastname, telefon, email FROM expeditori WHERE userID = $1", [userId],  (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getCereri = (req, res) => {
    const userID = req.params.id;
    pool.query("SELECT C.tip_marfa, C.masa, C.volum, C.data_plecarii, C.data_max_plecarii, C.locul_plecarii, C.data_sosirii, C.data_max_sosirii, C.locul_sosirii, C.buget, C.stare \
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
            data_max_plecarii, locul_plecarii, data_sosirii, data_max_sosirii, locul_sosirii, buget, stare) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [results.rows[0].expeditorid,tip_marfa, masa, volum, data_plecarii, data_max_plecarii, locul_plecarii, data_sosirii, data_max_sosirii, locul_sosirii, buget, "Inregistrata"], 
                    (error, resultss) => {
            if (error) throw error;

            res.status(201).json(resultss.rows);
        })
    })
};

const getOferte =  (req, res) => {
    pool.query("SELECT C.camionID, C.tip_camion, C.volum, C.latime, C.lungime, C.inaltime, C.greutate, \
                Cr.data_plecarii + interval '1 day' as data_plecarii, Cr.locul_plecarii, \
                Cr.data_sosirii + interval '1 day' as data_sosirii, Cr.locul_sosirii, \
                Cr.pret_km_gol, Cr.pret_km_incarcat FROM camion C JOIN curse Cr ON C.camionID = Cr.camionID \
                AND data_plecarii >= CURRENT_DATE",
                (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getDateTransportatorFromOfertaID = (req, res) => {
    const camionID = req.params.id;
    pool.query("SELECT T.transportatorid, T.firstname, T.lastname, T.telefon, T.email FROM transportatori T JOIN camion C \
                ON T.transportatorid = C.transportatorid WHERE C.camionid = $1;", [camionID], 
                (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows[0]);
    })
};

const addContract = async(req, res) => {
    const {transportatorid, expeditorid, cerereid} = req.body;

    await pool.query("UPDATE cereri SET stare = 'preluat' WHERE cerereid = $1;", [cerereid], (error, results) => {
        if (error) throw error;
        pool.query("INSERT INTO contracte(transportatorid, expeditorid, cerereid) VALUES ($1, $2, $3) RETURNING *",
        [transportatorid, expeditorid, cerereid], 
                (error, results) => {
            if (error) throw error;

            res.status(201).json(results.rows);
        })
    });
};

const getCamion = (req, res) => {
    const camionId = parseInt(req.params.id);
    pool.query("SELECT tip_camion, volum, latime, lungime, inaltime, greutate, disponibilitate FROM camion WHERE camionID = $1", [camionId],  (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getCerereById = (req, res) => {
    const cerereID = req.params.id;
    pool.query("SELECT tip_marfa, masa, volum, data_plecarii, data_max_plecarii, locul_plecarii, data_sosirii, data_max_sosirii, locul_sosirii, buget, stare \
                FROM cereri WHERE cerereID=$1", [cerereID], 
                (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getExpeditorbyUserId,
    getCereri,
    addCerere,
    getOferte,
    getDateTransportatorFromOfertaID,
    addContract,
    getCamion,
    getCerereById
}