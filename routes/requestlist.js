var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Request = require('../models/Request');
var Task = require('../models/Task');

/* GET home page. */
router.get('/',needAuth, function(req, res, next) {
    Request.find({},function(err,requestlists){
        if(err){
            return next(err);
        }
        res.render('request/list', {requestlists : requestlists});
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
