import { Bracelet }  from './bracelet.model';
import { User } from '../user/user.model';

export class BraceletService {

  create(req, res) {
    var bracelet = new Bracelet();

    bracelet.name = req.body.name;
    bracelet.strings = req.body.strings;
    bracelet.type = req.body.type;
    bracelet.public = req.body.public;
    bracelet.rows = req.body.rows;
    bracelet.author = {name: req.decoded.user.name, id: req.decoded.user.id};
    bracelet.save(function(err) {
      if (err)
      res.send(err);

      res.json({ status: 1, _id: bracelet._id });
    })
  }

  all(req, res) {
    let limit : number = req.query.limit ? +req.query.limit : 18;
    let page : number = req.query.page ? +req.query.page - 1 : 0;
    let sortby = {'created': -1};
    if(req.query.sortby == 'oldest') {
      sortby = {'created': 1}
    }

    Bracelet.count({public: true}).exec(function(err, count) {
      Bracelet.find({public: true}).sort(sortby).skip(limit*page).limit(limit).exec(function(err, bracelets) {
        if (err)
        res.send(err);

        res.json({bracelets: bracelets, count: count});
      });
    })

  }

  usersBracelet(req, res) {
    let limit : number = req.query.limit ? +req.query.limit : 18;
    let page : number = req.query.page ? +req.query.page - 1 : 0;
    let sortby = {'created': -1};
    if(req.query.sortby == 'oldest') {
      sortby = {'created': 1}
    }

    let userId = req.query.userId;

    console.log(userId, "lalala")
    Bracelet.count({public: true, 'author.id': userId}).exec(function(err, count) {
      Bracelet.find({public: true, 'author.id': userId}).sort(sortby).skip(limit*page).limit(limit).exec(function(err, bracelets) {
        if (err)
          res.send(err);

        User.findOne({_id: userId}).exec(function(err, user) {
          if (err)
            res.send(err);

          res.json({bracelets: bracelets, count: count, user: user});

        });
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
  }
}
