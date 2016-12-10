var express = require('express');
var router = express.Router();
var Request = require('../models/Request');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/request',needAuth, function(req, res, next){
  res.render('request/request');
});

router.post('/request',function(req, res, next){
  
  var request = new Request({
    check_in :  req.body.check_in,
    check_out : req.body.check_out,
    number_op : req.body.number_op
  });
  request.save(function(err, resultRequest){
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;