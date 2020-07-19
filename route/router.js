var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    //由于Ajax和重定向冲突，下面这段代码是限制不了主页内容的，只有在前端加上跳转的函数，详情见index.html
    if (!req.session['session_id'] && req.url != '/login' && req.url != '/signup' && req.url != '/loginM') {
        res.redirect('/login');
    } else {
        next();
    }
}); //////
/* GET index page */
router.get('/', function(req, res) {
    res.render('indexs', { path: 'index.html' });
});

module.exports = router;