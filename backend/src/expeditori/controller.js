const pool = require('../../db');

const getExpeditorbyUserId = (req, res) => {
    const userId = parseInt(req.params.id);
    pool.query("SELECT * FROM expeditori WHERE userID = $1", [userId],  (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

module.exports = {
    getExpeditorbyUserId
}