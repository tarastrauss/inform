var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session'); // for login sessions
var passport     = require('passport'); // Easy API Authorization
// var mongoStore = require('connect-mongo')(express)
require('dotenv').load();
require('./app/config/database');

// var inform = require('./app/routes/index');

var app = express();

// requiring the database
// var mongoose = require('./app/config/database');

// secure keys

// app.use('/', inform);

// app.locals({
//   title: 'inform'
// });
// view engine setup
app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'ejs');
// require('ejs').delimiter = '%';

// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin',  '*');
  // res.header('Access-Control-Allow-Origin: http://localhost:3000');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});


// uncomment after placing your favicon in /img
//app.use(favicon(path.join(__dirname, 'public/assets/img', 'inform.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(allowCrossDomain);

// app.use('/api/users', users);

app.use(session({
  secret: 'Inform',
  resave: false,
  saveUninitialized: true
}));

// app.use(session({
//     secret: 'my-session-store',
//     store: new mongoStore({
//         url: 'mongodb://localhost/inform',
//         collection : 'sessions'
//     })
// }));

// mount passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

require('./app/config/passport')(passport);

require('./app/routes/index')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
     .json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
   .json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
