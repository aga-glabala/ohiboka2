import { User }  from './user.model';
import * as request from 'request';

export class UserService {
  fb: any;
    constructor() {
      this.fb = { appId: '371302376535518', secret: '0d34a0167a7f06d568506b00c4a76f3d' };
    }

  loginFB(req, res) {
    console.log('1', req.body);

    User.findOne({ 'facebook.id' : req.body.userID }, function(err, user) {
      console.log('user', user);

      // if there is an error, stop everything and return that
      // ie an error connecting to the database
      if (err) {
        console.log(err);
      }

      // if the user is found, then log them in
      if (user) {
        console.log('user found', user);
        res.json({ status: 1, user: user}); // user found, return that user
      } else {
          // if there is no user found with that facebook id, create them

          request.get(
            {url: `https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cemail&access_token=${req.body.accessToken}`},
            function(error, response, body) {
                var json = JSON.parse(body);

                var newUser            = new User();

                // set all of the facebook information in our user model
                newUser.facebook.id    = json.id; // set the users facebook id
                newUser.facebook.token = req.body.accessToken;
                newUser.facebook.name  = json.name;
                newUser.facebook.email = json.email;

                // save our user to the database
                newUser.save(function(err) {
                    if (err) {
                      console.log(err);
                    }

                    // if successful, return the new user
                    res.json({ status: 1, user: newUser});
                });
              })
      }

  });
}


  /*create(req, res) {
    var bracelet = new Bracelet();

    bracelet.name = req.body.name;
    bracelet.strings = req.body.strings;
    bracelet.type = req.body.type;
    bracelet.public = req.body.public;
    bracelet.rows = req.body.rows;
    bracelet.save(function(err) {
      if (err)
      res.send(err);

      res.json({ status: 1, _id: bracelet._id });
    })
  }

  all(req, res) {
    let limit : number = req.query.limit ? +req.query.limit : 18;
    let page : number = req.query.page ? +req.query.page - 1 : 0;
    let sortby = {'created': 1};
    if(req.query.sortby == 'oldest') {
      sortby = {'created': -1}
    }

    Bracelet.count({public: true}).exec(function(err, count) {
      Bracelet.find({public: true}).sort(sortby).skip(limit*page).limit(limit).exec(function(err, bracelets) {
        if (err)
        res.send(err);

        res.json({bracelets: bracelets, count: count});
      });
    })

  }

  one(req, res) {
    Bracelet.findOne({_id: req.params.bracelet_id}, function(err, bracelet) {
      if (err)
      res.send(err);
      res.json(bracelet);
    });
  }

  save(req, res) {

    Bracelet.findById(req.params.bracelet_id, function(err, bracelet) {
      if (err) {
        res.send(err);
      }
      bracelet.name = req.body.name;
      bracelet.strings = req.body.strings;
      bracelet.type = req.body.type;
      bracelet.public = req.body.public;
      bracelet.rows = req.body.rows;

      bracelet.save(function(err) {
        if (err)
        res.send(err);

        res.json({ status: 1, _id: bracelet._id });
      });
    });
  }

  delete(req, res) {
    Bracelet.remove({
      _id: req.params.bracelet_id
    }, function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ status: 1 });
    });
  }*/
}
