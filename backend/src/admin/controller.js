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

const updateUser = async(req, res) => {
    const {username, firstname, lastname, telefon, email} = req.body;

    await pool.query(`SELECT user_type, userid from users WHERE username = $1`, [username], (error, results) => {
        if (error) throw error;

        if (results.rows[0].user_type == 1) {
            pool.query(`UPDATE transportatori SET firstname = $1, lastname = $2, telefon = $3, email = $4 WHERE userid = $5`,
            [firstname, lastname, telefon, email, results.rows[0].userid], (error, results) => {
                if (error) throw error;
            })
        } else if (results.rows[0].user_type == 2) {
            pool.query(`UPDATE expeditori SET firstname = $1, lastname = $2, telefon = $3, email = $4 WHERE userid = $5`,
            [firstname, lastname, telefon, email, results.rows[0].userid], (error, results) => {
                if (error) throw error;
            })
        }
        res.status(200).json({msg: 'Success'});
    })
}

module.exports = {
    getUsers,
    updateUser
}