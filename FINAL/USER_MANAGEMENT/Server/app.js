var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


const loginRoutes = require('./routes/login/loginRoutes');
const resetPasswordRoutes = require('./routes/reset_password/resetPasswordRoutes');
const forgotPasswordRoutes = require('./routes/forgot_password/forgotPasswordRoutes');
const userRoutes = require('./routes/user_routes/userRoutes');

const jwt = require('jsonwebtoken');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const url = 'mongodb+srv://admin:admin@cluster0.eaehxkp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url,{  useUnifiedTopology: true, useNewUrlParser: true},(err)=>{
  if(err){
    console.log(err);
    return ;
  }
  console.log('Connected to DB');
});

app.use('/login', loginRoutes);
app.use('/forgot_password', forgotPasswordRoutes);
app.use('/reset_password',resetPasswordRoutes);
app.use('/', userRoutes);

app.listen(8080, (err)=>{
  console.log('server running... 8080');
});

module.exports=app;