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



module.exports = router;
