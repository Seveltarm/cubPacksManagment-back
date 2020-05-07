var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');

var graphqlHTTP = require('express-graphql');
var schema = require('./schemas/schema.js');
var cors = require("cors");


mongoose.connect('mongodb://localhost/cubPacksManagment', { promiseLibrary: require('bluebird'), useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

// passport.use(
//   new GraphQLLocalStrategy((email, password, done) => {
//     const users = User.getUsers();
//     const matchingUser = users.find(user => email === user.email && password === user.password);
//     const error = matchingUser ? null : new Error('no matching user');
//     done(error, matchingUser);
//   }),
// );

var app = express();

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));
// app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
