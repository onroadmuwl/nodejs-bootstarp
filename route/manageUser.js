const express = require('express');
const mysql = require('mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'web'
});
var router = express.Router();
router.get('/get_books', (req, res) => {
    db.query(`SELECT * FROM buybook`, (err, data) => {
        if (err) {
            res.status(500).send('database error').end()
        } else {
            res.send(data).end();
        }
    })
});
router.get('/', (req, res) => {
    res.render('manageUser', { path: 'manageUser.html' });
})

module.exports = router;