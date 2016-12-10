var express = require('express'),
    User = require('../models/User'),
    Task = require('../models/Task');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({message: 'Not authorized'});
  }
}

router.get('/', needAuth, function(req, res, next) {
  Task.find({user: req.user.id}, function(err, tasks) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    res.json(tasks);
  });
});

router.post('/', needAuth, function(req, res, next) {
  if (!req.body.content) {
    return res.status(400).json({message: 'need content'});
  }
  var task = new Task({
    host_name: req.user.name,
    content: req.body.content,
    city: req.body.city,
    explain: req.body.explain,
    address: req.body.address,
    charge: req.body.charge,
    facilities: req.body.facilities,
    rule: req.body.rule,
    category: req.body.category || "N/A",
    priority: req.body.priority || 3,
    deadline: req.body.deadline,
    user: req.user.id
  });
  task.save(function(err, doc) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    res.status(201).json(doc);
  });
});

router.put('/:id', needAuth, function(req, res, next) {
  Task.findById(req.params.id, function(err, task) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!task) {
      return res.status(404).json({message: 'task not found'});
    }
    if (req.user.name){
      task.host_name = req.user.name;
    }
    if (req.body.content) {
      task.content = req.body.content;
    }
    if (req.body.city) {
      task.city = req.body.city;
    }
    if(req.body.explain) {
      task.explain = req.body.explain;
    }
    if (req.body.address) {
      task.address = req.body.address;
    }
    if (req.body.charge) {
      task.charge = req.body.charge;
    }
    if (req.body.facilities) {
      task.facilities = req.body.facilities;
    }
    if (req.body.rule) {
      task.rule = req.body.rule;
    }
    if (req.body.category) {
      task.category = req.body.category;
    }
    if (req.body.priority) {
      task.priority = req.body.priority;
    }
    if (req.body.deadline) {
      task.deadline = req.body.deadline;
    }
    if (req.body.done) {
      task.done = req.body.done;
    }
    task.save(function(err) {
      if (err) {
        return res.status(500).json({message: 'internal error', desc: err});
      }
      res.json(task);
    });
  });
});

router.get('/:id', needAuth, function(req, res, next) {
  Task.findById(req.params.id, function(err, task) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!task) {
      return res.status(404).json({message: 'task not found'});
    }
    res.json(task);
  });
});

router.delete('/:id', needAuth, function(req, res, next) {
  Task.findOneAndRemove({_id: req.params.id}, function(err, task) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    if (!task) {
      return res.status(404).json({message: 'task not found'});
    }
    res.json({id: task._id});
  });
});

module.exports = router;
