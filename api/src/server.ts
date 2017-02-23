import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';

import { BraceletService }  from './bracelet/bracelet.service';
import { UserService }  from './user/user.service';
import { userMiddleware } from './user/user.middleware';

var app = express();
var port = process.env.PORT || 8080;        // set our port
app.set('secretJWT', 'sdfdsfoweiiru3ufjfdsj'); // secret variable
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect('mongodb://mo1062_bracelet:Qs2fXUc4Qmj1qdCp8Pp5@mongo10.mydevil.net:27017/mo1062_bracelet'); // connect to our database
mongoose.set('debug', true);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');
});

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hello!' });
});

var braceletService = new BraceletService();

router.route('/bracelets')
  .get(braceletService.all);

router.route('/bracelets/users')
  .get(braceletService.usersBracelet);

router.route('/bracelets/:bracelet_id')
  .get(braceletService.one);


  var userService = new UserService(app.get('secretJWT'));

  router.route('/users/facebooklogin')
    .post(userService.loginFB());

  router.route('/users/login')
    .post(userService.loginLocal());

  router.route('/users/register')
    .post(userService.registerLocal());

// PRIVATE ROUTES -------------------------------
  var privateRouter = express.Router();
  privateRouter.use(userMiddleware(app.get('secretJWT')));
  privateRouter.get('/private', function(req, res) {
    res.json({ message: 'hello!' });
  });
  privateRouter.post('/users/verify', function(req:any, res) {
    let response = req.decoded;
    response.user.token = userService.getToken(response.user);
    res.json(response);
  });

  privateRouter.route('/bracelets')
    .post(braceletService.create)
  privateRouter.route('/bracelets/:bracelet_id')
    .put(braceletService.save)
    .delete(braceletService.delete);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/api/private', privateRouter);


// START THE SERVER
// =============================================================================
app.listen(8080);
console.log('Magic happens');
