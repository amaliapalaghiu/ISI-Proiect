const pool = require('../../db');

const getUsers = async (req, res) => {
    const transportatori = await pool.query(`SELECT U.username, T.firstName, T.lastName, T.telefon, T.email from transportatori T JOIN users U on U.userID = T.userID`);
    const expeditori = await pool.query(`SELECT U.username, E.firstName, E.lastName, E.telefon, E.email from expeditori E JOIN users U on U.userID = E.userID`);

    const response = transportatori.rows.concat(expeditori.rows);

    if (response.length !== 0) {
        res.status(200).json(response);
    } else {
        res.status(400).json({ message: 'No users found'});
    }
}

module.exports = {
    getUsers
}