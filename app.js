var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({dest: './uploads'});
var fs = require('fs');

var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

// LOAD ROUTES FROM VIEWS DIRECTORY
var index = require('./routes/index');
var admin = require('./routes/admin');
var blog = require('./routes/blog');
var portfolio = require('./routes/portfolio');
var resume = require('./routes/resume');
var contact = require('./routes/contact');


var app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// HANDLE SESSIONS
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// PASSPORT AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());

// VALIDATOR middleware??


// FLASH MESSAGES
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// USE ROUTES AS THERE REQUESTED
app.use('/', index);
app.use('/admin', admin);
app.use('/blog', blog);
app.use('/portfolio', portfolio);
app.use('/resume', resume);
app.use('/contact', contact);



// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
