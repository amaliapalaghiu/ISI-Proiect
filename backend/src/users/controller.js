const pool = require('../../db');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    const {username, passwrd} = req.query;
    pool.query("SELECT * FROM users WHERE username=$1", [username], (error, results) => {
        if (error) throw error;

        if (results.rows.length !== 0) {
            const hashPassword = results.rows[0].passwrd;
            bcrypt.compare(passwrd, hashPassword).then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({ message: 'Password is incorrect!'});
                }
                res.status(200).json(results.rows);
            });
        } else {
            res.status(400).json({ message: 'No username found'});
        }
    })
};

const addUsers = async(req, res) => {
    const {username, passwrd, firstName, lastName, telephone, email, user_type} = req.body;
    const validUsername = await pool.query(`SELECT * FROM users WHERE username=$1`, [username]);
    const hashPassword = await bcrypt.hash(passwrd, 10);

    if (validUsername.rows.length !==0) {
        res.status(409).json({message: "Username already exists"});
    } else {
        await pool.query("INSERT INTO users(username, passwrd, user_type) VALUES ($1, $2, $3) RETURNING *",
            [username, hashPassword, user_type], (error, results) => {
            if (error) throw error;

            if (user_type === 1) {
                pool.query("INSERT INTO transportatori(userID, firstName, lastName, telefon, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [results.rows[0].userid, firstName, lastName, telephone, email], (error, results) => {
                    if (error) throw error;
                    res.status(201).json(results.rows);
                })
            } else if(user_type === 2){
                pool.query("INSERT INTO expeditori(userID, firstName, lastName, telefon, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [results.rows[0].userid, firstName, lastName, telephone, email], (error, results) => {
                    if (error) throw error;
                    res.status(201).json(results.rows);
                })
            }
        })
    }
};

module.exports = {
    getUsers,
    addUsers,
}