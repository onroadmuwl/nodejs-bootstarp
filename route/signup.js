var express = require('express');
var mysql = require('mysql')
var router = express.Router();
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'web'
});
router.get('/', function(req, res) {
    res.render('signup', { path: 'signup.html' });
    //res.sendFile('index.html');
});
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db.query(`SELECT * FROM consumerlists WHERE username='${username}'`, (err, data) => {
        if (err) {
            res.send("服务器出错").end();
        } else {
            if (data.length != 0) {
                res.send({ msg: 'exist' }).end();
            } else {
                db.query(`INSERT INTO consumerlists (username,password) VALUES ('${username}','${password}')`, (err, data) => {
                    if (err) {
                        res.send({ msg: 'error' }).end();
                    } else { //成功
                        res.send({ msg: 'success', url: '/login' }).end();
                    }
                })
            }
        }

    });

});


module.exports = router;