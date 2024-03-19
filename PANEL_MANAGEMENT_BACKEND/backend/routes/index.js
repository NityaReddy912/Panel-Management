var express = require('express');
var router = express.Router();
const Panel = require('./../models/Panel');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('first');
  next()
}, function(req,res,next){
  console.log('second');
});

module.exports = router;