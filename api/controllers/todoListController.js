'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');
var twit = require('twitter');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findOne({name: req.params.taskId}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};


exports.get_twitter_data = function(req, res) {

  var twitter = new twit({
    consumer_key: '23DGxSTH6i75Viwxoc6yAVM3B',
    consumer_secret: 'OIj0VeOnHCXhJ582bPegZzVPoMBxcawKgrktiCZOxDhl7KwchD',
    access_token_key: '3196860427-zwRLNHwH8e2CIJhaJiBIyKvVZ6zjAY5Qgv2bWsf',
    access_token_secret: 'hKqZY62F8C1J6KCkSdDB3r87KmLNswVBZwcQUkxIk8vx7'
  });

  var params = {screen_name: req.params.screenName};
  var following = 0;
  var followers = 0;

  twitter.get('friends/ids', params, function(error, users, response) {
    if (!error) {
      following = users.ids.length;

      twitter.get('followers/ids', params, function(error, users, response) {
        if (!error) {
          followers = users.ids.length;
          
          // Return JSON response
          res.json({screen_name: req.params.screenName, number_following: following, number_followers: followers});
        }
      });
    }
  });
};
