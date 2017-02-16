import { User }  from './user.model';
import * as request from 'request';
import * as jwt from 'jsonwebtoken';

export class UserService {
  fb: any;
  secretJWT;

  constructor(secretJWT) {
    this.fb = { appId: '371302376535518', secret: '0d34a0167a7f06d568506b00c4a76f3d' };
    this.secretJWT = secretJWT;
  }

  loginLocal() {
    let that = this;
    return function(req, res) {
      User.findOne({ 'email' :  req.body.email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return res.json({ action: 'login', status: 0, user: null,error: err});

        // if no user is found, return the message
        if (!user)
          return res.json({ action: 'login', status: 0, user: null, error: {message: 'No user found.'}});

        // if the user is found but the password is wrong
        if (!user.validPassword(req.body.password))
          return res.json({ action: 'login', status: 0, user: null, error: {message: 'Oops! Wrong password.'}});

        // all is well, return successful user
        return res.json({ action: 'login', status: 1, user: user, token: that.getToken(user)});
      });
    }
  }

  registerLocal() {
    let that = this;
    return function(req, res) {
      User.findOne({ 'email' :  req.body.email }, function(err, user) {
        // if there are any errors, return the error
        if (err)
          return res.json({ action: 'register', status: 0, user: null, error: err});

        // check to see if theres already a user with that email
        if (user) {
          return res.json({ action: 'register', status: 0, user: null, error: {message: 'That email is already taken.'}});
        } else {

          // if there is no user with that email
          // create the user
          var newUser = new User();

          // set the user's local credentials
          newUser.email    = req.body.email;
          newUser.password = newUser.generateHash(req.body.password);

          // save the user
          newUser.save(function(err, user) {
            if (err)
            throw err;
            return res.json({ action: 'register', status: 1, user: user, token: that.getToken(user)});
          });
        }
      });

    }
  }

  loginFB() {
    let that = this;
    return function(req, res) {

      User.findOne({ 'facebook_id' : req.body.userID }, function(err, user) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) {
          console.log(err);
        }

        // if the user is found, then log them in
        if (user) {
          res.json({ status: 1, user: user, token: that.getToken(user)}); // user found, return that user
        } else {
          // if there is no user found with that facebook id, create them

          request.get(
            {url: `https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cemail&access_token=${req.body.accessToken}`},
            function(error, response, body) {
              var json = JSON.parse(body);

              User.findOne({ 'email' : json.email }, function(err, user2) {

                let user = user2 || new User();

                user.facebook_id    = json.id; // set the users facebook id
                user.facebook_token = req.body.accessToken;
                if(!user.name) {
                  user.name  = json.name;
                }
                user.save(function(err, user3) {
                  if (err) {
                    console.log(err);
                  }

                  // if successful, return the new user
                  res.json({ status: 1, user: user3, token: that.getToken(user3)});
                });
              });
            })
          }

        });
      }
    }

    getToken(user) {
      return  jwt.sign({id: user._id}, this.secretJWT, {});
    }
}
