var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const Handlebars = require('handlebars');
var expressHbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');

//MONGOOSE======================================================================================
var mongoose = require('mongoose');
// Для подключения к БД shopping применяем метод connect()
mongoose.connect('mongodb://localhost:27017/shopping', {
        // mongoose.connect('mongodb+srv://student:Start2020@cluster0-qse6h.mongodb.net/sample-database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(Error, err.message);
    });
//================================================================================================
var indexRouters = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();

require('./config/passport');
//HANDLEBARS======================================================================================
// view engine setup
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');
//================================================================================================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//EXPRESS-SESSION==================================================================================
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false
}));
//PASSPORT========================================================================================
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});
//================================================================================================
app.use('/user', userRoutes);
app.use('/', indexRouters);
//================================================================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;