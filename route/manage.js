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
    db.query(`SELECT * FROM bookslists`, (err, data) => {
        if (err) {
            res.status(500).send('database error').end()
        } else {
            res.send(data).end();
        }
    })
});
router.get('/', (req, res) => {
        res.render('manage', { path: 'manage.html' });
    })
    //新增
router.post('/books_add', (req, res) => {
    var datas = req.body;
    db.query(`INSERT INTO bookslists (BookId,BookName,Auther, Publisher, OrignalPrice, DiscountPrice, Introduce,RemainNumber) VALUES ('${datas.code_a}','${datas.name_a}','${datas.author_a}','${datas.company_a}','${datas.price_a}','${datas.price_d_a}','${datas.Intro_a}','${datas.num_a}')`, (err, data) => {
        if (err) {
            res.send({ msg: 'wrong' }).end();
            throw err;
        } else {
            res.status(200).send({ msg: 'success' }).end();
        }
    })
})



//修改
router.post('/books_update', (req, res) => {
        var datas = req.body;
        db.query(`UPDATE bookslists SET BookName='${datas.name_e}',Auther='${datas.author_e}',Publisher='${datas.company_e}',OrignalPrice='${datas.price_e}',DiscountPrice='${datas.price_d_e}',Introduce='${datas.Intro_e}',RemainNumber='${datas.num_e}' WHERE BookId='${datas.code_e}'`, (err, data) => {
            if (err) {
                res.send({ msg: 'wrong' }).end();
                throw err;
                //res.status(500).send('数据库错误').end();
            } else {
                res.send({ msg: 'success' }).end();
            }
        })
    })
    //删除
router.post('/books_del', (req, res) => {
    db.query(`DELETE FROM bookslists WHERE BookId='${req.body.BookId}'`, (err, data) => {
        if (err) {
            //最好不要加上状态信息，尤其是出错的状态信息，否则ajax返回数据会直接报错
            //res.status(400).send({ msg: 'wrong' }).end();
            res.send({ msg: 'wrong' }).end();
        } else {

            res.send({ msg: 'success' }).end()
        }
    })
})
module.exports = router;