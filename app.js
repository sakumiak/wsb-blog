var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

//Routes declaration
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Database connection
//Local connection
//var mongoDB = 'mongodb://127.0.0.1/my_db';
//Azure connection
var mongoDB = 'mongodb://kmajewski2345wsb-projekt-db:CyOcSIXcvas6VLfLRAxiMgOFcDGxvKceJuAqnkBAS1zEHuY9FKPlJOmKBUwEasUVs3FAgfezEQHefWhbVCvKgw==@kmajewski2345wsb-projekt-db.documents.azure.com:10250/mean?ssl=true&sslverifycertificate=false';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.urlencoded({ extended: false}));

//Routes init
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles',articlesRouter);

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
