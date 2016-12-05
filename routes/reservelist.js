var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Reserve = require('../models/Reserve');
// var Task = require('../models/Task');

/* GET home page. */
router.get('/', function(req, res, next) {
    Reserve.find({},function(err,resevelists){
        if(err){
            return next(err);
        }
        res.render('reserve/list', {resevelists : resevelists});
    });
});

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}


module.exports = router;
