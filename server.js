var express = require('express');
var config = require('./config/config');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./controllers/routes/index');


//set up mongoose
//determine db path
var db = process.env.MONGODB_URI || config.test_db;
// Bring Mongoose into the app
var mongoose = require( 'mongoose' );
// Create the database connection
mongoose.connect(db);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + db );
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/datetimepicker', express.static(path.join(__dirname, '/node_modules/angular-bootstrap-datetimepicker/src/')));
app.use('/moment', express.static(path.join(__dirname, '/node_modules/moment')));

// view engine setup
app.set('view engine', 'ejs');

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = {status: 404, message:'Page not found', title: 'Not found'}
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  var display = {};
  res.status(err.status || 500);
  console.log('error:', res.status, 'message:', err.message);
  display.err = err
  res.render('error', display); 
  return null;
});

module.exports = app;
