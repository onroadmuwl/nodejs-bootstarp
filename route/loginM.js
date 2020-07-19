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
    res.render('loginM', { path: 'loginM.html' });
});
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db.query(`SELECT * FROM salerlists WHERE UserName='${username}'`, (err, data) => {
        if (err) {
            res.status(500).send({ msg: 'err' }).end();
        } else { //成功
            if (data.length == 0) {
                res.send({ msg: 'noexist' }).end();
            } else { //成功且有值
                if (data[0].Password == password) {
                    //给session赋值
                    req.session['session_id'] = data[0].UserName;
                    res.send({ msg: 'success', url: '/manage' }).end();
                    //重定向到首页,使用Ajax无法重定向
                    //res.redirect('/'); //回到index.js的执行
                } else {
                    res.send({ msg: 'wrongpassword' }).end();
                }
            }
        }
    })
});
module.exports = router;