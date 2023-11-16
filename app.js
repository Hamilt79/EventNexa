var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { MongoConnection } = require('./routes/mongodb/mongodb');

// Pages to display
var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/registration');
var loginRouter = require('./routes/login');
var eventRouter = require('./routes/event');

// Starting express app
var app = express();

// Need this to allow reading and sending requests from client-side js
var cors = require('cors');
// Making the express app use cors
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// making the app display the pages
app.use('/', indexRouter);
app.use('/registration/createaccount', registrationRouter);
app.use('/login/loginrequest', loginRouter);
app.use('/event', eventRouter);

// Starting MongoDB connection
MongoConnection.init();

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

// Runs when process is killed/shut down
process.on('SIGINT', function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl+C)");
  MongoConnection.mongoConnection.close();
  process.exit();
});

module.exports = app;
