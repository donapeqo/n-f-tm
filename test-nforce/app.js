require('dotenv').config();

var express = require('express');
var engine = require('ejs-mate');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('./models/user');
var session = require('express-session');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

require('./lib/connection');

// Require Routes
var index = require('./routes/index');
var pricebookRouter = require('./routes/pricebooks');
var users = require('./routes/users');

var app = express();

// connect to the database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
 });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('TMUSA-APP is connected!')
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Configure Passport and Sessions
app.use(session({
  secret: 'TMUSA New Website!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variables middleware
app.use(function(req, res, next) {
  // req.user = {
	// '_id' : '5c5b565321af2022628995da',
  // 'isAdmin' : 'true',
	// '_id' : '5c437f0092dd9a55ae3a9d9c',
	// '_id' : '5c4a1c05d2128e86193f6075',
	// 'username' : 'AimerFarid'
  // }
  res.locals.currentUser = req.user;
  // set default page title
  res.locals.title = 'TMUSA Website';
  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  // set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  // continue on to next function in middleware chain
  next();
});

// Mount Routes
app.use('/', index);
app.use('/pricebooks', pricebookRouter);
app.use('/users', users);

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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
