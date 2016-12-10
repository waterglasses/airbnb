var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}



module.exports = router;
///
// router.get('/cities', needAuth, function(req, res, next) {
//   Room.find({city: req.query.city}, function(err, result) {
//     if (err) {
//       return next(err);
//     }
//     console.log(result);
//     res.render('rooms/cities', {rooms: result});
//   });
// });