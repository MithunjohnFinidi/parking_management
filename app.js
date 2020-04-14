var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
// import * as cors from 'cors'

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const db = require('./config/db');

db.authenticate().then( () => {
  console.log("connected")
}).catch( err => console.log(err))

var app = express();

app.set('port', process.env.PORT || 8080);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.options('*', cors())

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//   next();
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/locations', require('./routes/location'));
app.use('/bookings', require('./routes/booking'));
app.use('/vehicles', require('./routes/vehicle'));
app.use('/dashboard', require('./routes/dashboard'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(app.get('port'));

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
