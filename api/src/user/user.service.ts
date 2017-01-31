import { User }  from './user.model';
import * as FB from 'facebook-ts';

export class UserService {

    constructor() {
      FB.settings.setSecret('0d34a0167a7f06d568506b00c4a76f3d');
      FB.settings.setClientId('371302376535518');
    }

  loginFB(req, res) {
    console.log(req.body);
    FB.getUser(req.body.userID)
      .then(user => {
        console.log(user)
      });
    res.json({ status: 1 });
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
