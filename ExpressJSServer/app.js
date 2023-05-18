var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var app = express();

// view engine setup
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
//path views setup (jade)
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
//app.use(express.urlencoded({extended: true})); 
//app.use(express.json());


//Built-in middleware.
app.use(cookieParser());
//set cookie





app.use(express.static(path.join(__dirname, 'public')));
//set Public folder web-app.
app.use('/public/images', express.static('images'));
app.use('/public/payments', express.static('payments'));
app.use('/public/shirts', express.static('shirts'));
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



app.use('/services', require('./services/index'));
app.use('/', indexRouter);
//app.use('/arm_mongo', require('./routes/arm'));
app.use('/users', usersRouter);
app.use('/test', require('./routes/test'));
//router setup


app.use(function (req, res, next) {
  next(createError(404));
});
// catch 404 and forward to error handler



app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// error handler


module.exports = app;
