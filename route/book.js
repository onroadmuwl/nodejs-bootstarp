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
        res.render('indexs', { path: 'index.html' });
    })
    //新增
router.post('/books_add', (req, res) => {
    var datas = req.body;
    db.query(`INSERT INTO bookslists (BookId,BookName, Auther, Publisher, OrignalPrice, DiscountPrice, Introduce) VALUES ('${datas.BookId}','${datas.BookName}','${datas.Auther}','${datas.Publisher}','${datas.OrignalPrice}','${datas.DiscountPrice}','${datas.Introduce}')`, (err, data) => {
        if (err) {
            res.send({ msg: 'wrong' }).end();
            throw err;
        } else {
            res.status(200).send({ msg: 'success' }).end();
        }
    })
})


//新增买书的表
router.post('/books_buy', (req, res) => {
    var datas = req.body;
    db.query(`INSERT INTO buybook (BookId,BookName, DiscountPrice,BuyTime, CONSUMER) VALUES ('${datas.BookId}','${datas.BookName}','${datas.DiscountPrice}','${datas.BuyTime}','${datas.CONSUMER}')`, (err, data) => {
        if (err) {
            res.send({ msg: 'wrong' }).end();
            throw err;
        } else {
            res.status(200).send({ msg: 'success' }).end();
        }
    })
})


//买书操作
router.post('/books_updateNum', (req, res) => {
    var datas = req.body;
    db.query(`UPDATE bookslists SET RemainNumber='${datas.RemainNumber}' WHERE BookId='${datas.BookId}'`, (err, data) => {
        if (err) {
            res.send({ msg: 'wrong' }).end();
            throw err;
            //res.status(500).send('数据库错误').end();
        } else {
            res.send({ msg: 'success' }).end();
        }
    })
})

//修改
router.post('/books_update', (req, res) => {
        var datas = req.body;
        db.query(`UPDATE bookslists SET BookName='${datas.BookName}',Auther='${datas.Auther}',Publisher='${datas.Publisher}',OrignalPrice='${datas.OrignalPrice},DiscountPrice='${datas.DiscountPrice}',Introduce='${datas.Introduce}' WHERE BookId='${datas.BookId}'`, (err, data) => {
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
    db.query(`DELETE FROM commodity WHERE BookId='${req.body.BookId}'`, (err, data) => {
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
