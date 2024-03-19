var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const PORT=process.env.PORT;

const addPanelRoute = require('./routes/AddPanel/AddPanel');
const panelListRoute = require('./routes/PanelList/PanelList');
const addPanelSingleRoute = require('./routes/AddPanelAvailabilityPANEL/single/PANELsingle');
const editPanelRoute = require('./routes/EditPanel/EditPanel');
const addPanelMultiplePHRoute = require('./routes/AddPanelAvailabilityPH/multiple/PHmultiple');
const updatePanelRoute = require('./routes/updatePanel/updatePanel');
const panelAvailabilityRoute = require('./routes/PanelAvailability/PanelAvailability');
const addPanelAvailSingle = require('./routes/AddPanelAvailabilityPANEL/single/PANELsingle');
const addPanelAvailPA = require('./routes/AddPanelAvailabilityPANEL/multiple/PANELmultiple');
const interviewRouter = require("./routes/Interview/interview");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
  next();
});

// const url = 'mongodb+srv://admin:admin@cluster0.eaehxkp.mongodb.net/PanelDB?retryWrites=true&w=majority';
const url = 'mongodb+srv://avinash:jVzfWkq29eTIaUvJ@panelcluster.fvymwmx.mongodb.net/Panel_Management';
mongoose.connect(url,{  useUnifiedTopology: true, useNewUrlParser: true},(err)=>{
  if(err){
    console.log(err);
    return ;
  }
  console.log('Connected to DB');
});


app.use('/addPanel', addPanelRoute);
app.use('/panelList', panelListRoute);
app.use('/addPanelSingle', addPanelSingleRoute);
app.use('/editpanel', editPanelRoute);
app.use('/panel_availability', addPanelMultiplePHRoute);
app.use('/updatePanel', updatePanelRoute);
app.use('/panelavail', panelAvailabilityRoute);
app.use('/phsingle', addPanelAvailSingle);
app.use('/addAvailPH', addPanelMultiplePHRoute);
app.use('/panelavailPA', addPanelAvailPA);
app.use("/interview", interviewRouter); 

app.listen(PORT, (err)=>{
  console.log("Connected");
});


module.exports = app;