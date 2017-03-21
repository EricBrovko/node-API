'use strict';

var _ = require('lodash');
var async = require('async');
var _ = require('lodash')

module.exports = {
  index: function(req, res) {
    res.render('index');
  },
  list: function(req, res) {
    var mongodb = req.app.components.MongoDb.db;

    mongodb.collection('node_contacts')
      .find({}, { _id: 0 })
      .toArray(function(err, result) {
        res.render('list', { contacts: result });
      });
  },
  create: function(req, res) {
    res.render('create');
  },
  insert: function(req, res) {
    var mongodb = req.app.components.MongoDb.db;
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var toSave = {
      name: name,
      phone: phone,
      callAmount: 0,
      email: email
    };

    async.series([
      function(callback) {
        mongodb.collection('node_contacts')
          .findOne({ name: name }, function(err, result) {
            if (!_.isEmpty(result)) {
              return callback(new Error('Contact is dublicated'));
            }

            callback();
          })
      },
      function(callback) {
        mongodb.collection('node_contacts')
          .updateOne({ name: name }, { $set: toSave }, { upsert: true }, callback);
      }
    ], function(err, result) {
      if (err) {
        return res.status(500).send(err.message);
      }

      res.redirect('/create');
    });
  },
  update: function(req, res) {
    var mongodb = req.app.components.MongoDb.db;
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var toSave = {
      name: name,
      phone: phone,
      callAmount: 0,
      email: email
    };

    mongodb.collection('node_contacts')
      .updateOne({ name: name }, { $set: toSave }, { upsert: true }, function(err, result) {
        if (err) {
          return res.status(500).send(err.message);
        }

        res.redirect('/list');
      });
  },
  call: function(req, res) {
    var mongodb = req.app.components.MongoDb.db;
    var name = req.body.name;

    mongodb.collection('node_contacts')
      .updateOne({ name: name }, { $inc: { callAmount: 1 } }, { upsert: 1 }, function(err) {
        if (err) {
          return res.status(500).send(err.message);
        }

        res.redirect('/list');
      });
  },
  edit: function(req, res) {
    var mongodb = req.app.components.MongoDb.db;
    var name = req.body.name;

    mongodb.collection('node_contacts')
      .findOne({ name: name }, function(err, result) {
        if (err) {
          return res.status(500).send(err.message);
        }

        res.render('edit', { contact: result });
      });

  },
  remove: function(req, res) {
    var mongodb = req.app.components.MongoDb.db;
    var name = req.body.name;

    mongodb.collection('node_contacts')
      .remove({ name: name }, function(err) {
        if (err) {
          return res.status(500).send(err.message);
        }

        res.redirect('/list');
      });
  }
};
