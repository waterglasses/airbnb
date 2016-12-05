var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

/* GET home page. */
router.get('/', function(req, res, next) {
    Task.find({}, function(err, hosts) {
        if(err){
            return next(err);
        }
        res.render('host/list', {hosts : hosts})
    })
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
