const pool = require('../../db');

const getTransportatori = (req, res) => {
    pool.query("SELECT * FROM transportatori", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getTransportatori,
}