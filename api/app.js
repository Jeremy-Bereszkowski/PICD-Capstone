const dotenv = require("dotenv");
dotenv.config();

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var auth = require('./routes/auth');
var dashboard = require('./routes/dashboard');
var project = require('./routes/project');
var version = require('./routes/version');
var admin = require('./routes/admin');
var media = require('./routes/media');
var download = require('./routes/download');
var upload = require('./routes/upload');
var cors = require("cors");

var app = express();

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-m8u82c98.au.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.picdcapstone2020.dev',
  issuer: 'https://dev-m8u82c98.au.auth0.com/',
  algorithms: ['RS256']
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { dotfiles: 'allow' }));
app.use(jwtCheck);

app.use('/auth', auth);
app.use('/dashboard', dashboard);
app.use('/project', project);
app.use('/project/version', version);
app.use('/admin', admin);
app.use('/media/download', download);
app.use('/media/upload', upload);
app.use('/media', media);

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
