import { Bracelet }  from './bracelet.model';

export class BraceletService {

  create(req, res) {
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
    Bracelet.find({public: true}).limit(req.limit ? req.limit : 18).exec(function(err, bracelets) {
      if (err)
      res.send(err);

      res.json({bracelets: bracelets, count: 10});
    });
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
