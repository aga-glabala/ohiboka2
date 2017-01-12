import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

var app = express();
var port = process.env.PORT || 8080;        // set our port

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://mo1062_bracelet:Qs2fXUc4Qmj1qdCp8Pp5@mongo10.mydevil.net:27017/mo1062_bracelet'); // connect to our database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

var Bracelet = require('./models/bracelet');

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/bracelets')

// create a bear (accessed at POST http://localhost:8080/api/bears)
.post(function(req, res) {

  var bracelet = new Bracelet();      // create a new instance of the Bear model

  bracelet.name = req.body.name;  // set the bears name (comes from the request)
  bracelet.strings = req.body.strings;
  bracelet.type = req.body.type;
  bracelet.public = req.body.public;
  bracelet.rows = req.body.rows;
  bracelet.save(function(err) {
    if (err)
    res.send(err);

    res.json({ status: 1, _id: bracelet._id });
  })
})
.get(function(req, res) {
  Bracelet.find(function(err, bracelets) {
    if (err)
    res.send(err);

    res.json(bracelets);
  });
});
router.route('/bracelets/:bracelet_id')
.get(function(req, res) {

  Bracelet.findOne({_id: req.params.bracelet_id}, function(err, bracelet) {
    if (err)
    res.send(err);
    res.json(bracelet);
  });
})
.put(function(req, res) {

  // use our bear model to find the bear we want
  Bracelet.findById(req.params.bracelet_id, function(err, bracelet) {

      if (err) {
          res.send(err);
      }
      bracelet.name = req.body.name;  // set the bears name (comes from the request)
      bracelet.strings = req.body.strings;
      bracelet.type = req.body.type;
      bracelet.public = req.body.public;
      bracelet.rows = req.body.rows;

      // save the bear
      bracelet.save(function(err) {
          if (err)
              res.send(err);

          res.json({ status: 1, _id: bracelet._id });
      });

  });
}).delete(function(req, res) {
    Bracelet.remove({
        _id: req.params.bracelet_id
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ status: 1 });
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(8080);
console.log('Magic happens');
