var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');

  // mongoose instance connection url connection
  //mongoose.Promise = global.Promise;
  //mongoose.connect('mongodb://forkchat:adventurecorp1@ds059207.mlab.com:59207/Tododb');

  /*var promise = mongoose.createConnection('mongodb://forkchat:adventurecorp1@ds059207.mlab.com:59207/forkchat', {
    useMongoClient: true,
  });*/
  mongoose.connect('mongodb://forkchat:adventurecorp1@ds059207.mlab.com:59207/forkchat', { useMongoClient:
    true });
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('openUri', function() {
      // we're connected!
  });

/*promise.then(function(db) {
   console.log('Got here');
});*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
app.use(function(req, res) {
  console.log('Entered this block');
  res.status(404).send({url: req.originalUrl + ' not found'})
});
*/

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
