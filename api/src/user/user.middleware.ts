import * as jwt from 'jsonwebtoken';
import { User }  from './user.model';

export function userMiddleware(secretJWT) {
  return function(req, res, next) {

    if(req.method == 'OPTIONS') {
      next();
    } else {

      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'];

      // decode token
      if (token) {
        let tmp = token.split("Bearer ");
        token = tmp[tmp.length - 1];
        // verifies secret and checks exp
        jwt.verify(token, secretJWT, function(err, decoded) {
          if (err) {
            return res.json({ status: 0, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            User.findOne({ '_id' :  decoded.id }, function(err, user) {
              // if there are any errors, return the error before anything else
              if (err)
                return res.json({ status: 0, message: 'Failed to authenticate token.', error: err });

              // if no user is found, return the message
              if (!user)
                return res.json({ status: 0, message: 'Failed to authenticate token.', error: {message: 'No user found.'} });

              // all is well, return successful user
              req.decoded = { action: 'login', status: 1, user: user, token: ''};
              next();
            });
          }
        });

      } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

      }
    }
  }
};
