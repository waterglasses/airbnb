var express = require('express');
var router = express.Router();
var Reserve = require('../models/Reserve');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/request', function(req, res, next){
  res.render('reserve/request');
});

router.post('/request',function(req, res, next){
  console.log(req);
  console.log('----------------------');
  
  var reserve = new Reserve({
    check_in :  req.body.check_in,
    check_out : req.body.check_out,
    number_op : req.body.number_op
  });
  reserve.save(function(err, resultReserve){
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;