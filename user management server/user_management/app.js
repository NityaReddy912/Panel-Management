var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

const loginRoutes = require("./routes/login/loginRoutes");
const resetPasswordRoutes = require("./routes/reset_password/resetPasswordRoutes");
const forgotPasswordRoutes = require("./routes/forgot_password/forgotPasswordRoutes");
const userRoutes = require("./routes/user_routes/userRoutes");
const logoutRoute = require("./routes/logout/logoutRoute");

const jwt = require("jsonwebtoken");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, x-access-token",
  );
  next();
});

const url =
  "mongodb+srv://avinash:jVzfWkq29eTIaUvJ@panelcluster.fvymwmx.mongodb.net/Panel_Management";
mongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Connected to DB");
  },
);

app.use("/login", loginRoutes);
app.use("/forgot_password", forgotPasswordRoutes);
app.use("/reset_password", resetPasswordRoutes);
app.use("/", userRoutes);
app.use("/logout", logoutRoute);

// const token = jwt.sign({
//   user_name:'umesh', role:"god"
// },"", {expiresIn: 5});

// console.log(token);

// setTimeout(() => {
//   console.log(token);
//   try{
//     console.log(jwt.verify(token , "laulo_project"));
//   }
//   catch(err){
//     console.log('error')
//     console.log(err.message);
//   }
// }, 1 * 1000);

app.listen(8080, (err) => {
  console.log("server running... 8080");
});

module.exports = app;
