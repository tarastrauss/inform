var User = require('../models/user');


module.exports = {

  all: function(req, res) {
    User.find({}, function(err, users) {
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(users);
    });
  },

  currentUser: function(req, res) {
    User.findById(req.user.id, function(err, user) {
      res.json(user);
    });
  }

};
