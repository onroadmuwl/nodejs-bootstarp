const express = require('express');
const mysql = require('mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'web'
});
var router = express.Router();

router.get('/', (req, res) => {
    res.render('user', { path: 'user.html' });
})
router.post('/get_user', function(req, res) {
    var datas = req.session['session_id'];

    db.query(`SELECT * FROM buybook WHERE CONSUMER='${datas}';`, (err, data) => {
        if (err) {
            res.status(500).send('database error').end();
        } else {
            res.send(data).end();
        }
    });
})
module.exports = router;