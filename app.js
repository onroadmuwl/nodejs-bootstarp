var express = require('express');
var path = require('path');
var atrTemplate = require('express-art-template');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var routes = require('./route/router');
var login = require('./route/login');
var signup = require('./route/signup');
var book = require('./route/book');
var user = require('./route/user');
var manage = require('./route/manage');
var manageUser = require('./route/manageUser');
var loginM = require('./route/loginM');
var app = express();

app.use(express.static(path.join(__dirname, 'www')));
app.use(bodyParser.urlencoded({ extended: false })) //解析post数据的req.body数据，不然解析不出来会报错

app.listen(8080, '0.0.0.0');

app.engine('html', atrTemplate);

app.set('views', './www');

app.set('view engine', 'html');

app.use(cookieSession({
    name: 'session_id',
    secret: 'asdfghjklqwertyuiop',
    maxAge: 40 * 60 * 1000
}));


app.use('/', routes);
app.use('/login', login);
app.use('/signup', signup);
app.use('/book', book);
app.use('/user', user);
app.use('/manage', manage);
app.use('/manageUser', manageUser);
app.use('/loginM', loginM);
module.exports = app;
console.log("实例运行：127.0.0.1:8080");