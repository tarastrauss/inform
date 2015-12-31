var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session'); // for login sessions


require('dotenv').load();
require('./app/config/database');

// var inform = require('./app/routes/index');
var env = require('./app/config/environment');

var app = express();

app.set('title', env.TITLE);
app.set('safe-title', env.SAFE_TITLE);

app.set('secret-key', env.SECRET_KEY);

app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'ejs');
// require('ejs').delimiter = '%';


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


app.use(express.static(path.join(__dirname, 'public')));

//app.use(favicon(path.join(__dirname, 'public/assets/img', 'inform.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Root path: returns a list of possible requests.
app.get('/api', function(req, res, next) {
  var baseUri = `${req.protocol}:\/\/${req.get('host')}\/api`;
  res.json({
    token_url: `${baseUri}/token`,
    user_urls: [
      `${baseUri}/users`,
      `${baseUri}/me`
    ]
  });
});

// Validation: check for correctly formed requests (content type).
app.use(['/api/users', '/api/token'], function(req, res, next) {
  if (req.get('Content-Type') !== 'application/json') {
    errorHandler(
      400,
      'Request body must be JSON. Set your headers; see ' +
      'http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17',
      req, res
    );
  } else {
    next();
  }
});

// Parsing and validation (replies with good errors for JSON parsing).
app.use('/api', bodyParser.json());

// User resource route (POST /users)
require('./app/routes/userRoute')(app, errorHandler);

// Token resource route (POST /token)
require('./app/routes/tokenRoute')(app, errorHandler);

// Authorized resource route (GET /me)
require('./app/routes/meRoute')(app, errorHandler);

// Authorized resource route (GET /me)
require('./app/routes/searchRoute')(app, errorHandler);

// Catches all 404 routes, either for non-existing routes
// or routes that have passed to it.
app.use(function(req, res) {
  errorHandler(404, '', req, res)
});

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


function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

function errorHandler(code, message, req, res) {
  var title = '';
  var responseJson = {};

  res.status(code);
  switch(code) {
    case 400: title = '400 Bad Request';  break;
    case 401: title = '401 Unauthorized'; break;
    case 403: title = '403 Forbidden';    break;
    case 404: title = '404 Not Found';    break;
    case 422: title = '422 Unprocessable Entity';
  }

  responseJson.response = title;
  if (message && message.length > 0) responseJson.message = message;

  res.json(responseJson);
}



module.exports = app;
