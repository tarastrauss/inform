var moment = require('moment'),
    User   = require('../models/user');

// In order to simplify our process, we will handle the request
// inline here, instead of passing to controller files.
module.exports = function(app, errorHandler) {

  app.post('/api/users',

    // validations
    checkUserFields,
    checkPassword,
    checkDob,
    checkUserExists,

    // create new user
    function(req, res, next) {
      User.create({
        email:      req.body.email,
        firstName:  req.body.first_name,
        lastName:   req.body.last_name,
        password:   req.body.password,
        dob:        Date.parse(req.body.dob),
        points:     10
      }).then(function(newUser) {
        res.json({
          success: true,
          message: 'Successfully created user.',
          data: {
            email: newUser.email,
            id:    newUser._id
          }
        });
      }).catch(function(err) {
        next(err);
      });
  });





  // *** VALIDATIONS ***

  function checkUserFields(req, res, next) {
    if (
      !req.body.email       ||
      !req.body.first_name  ||
      !req.body.last_name   ||
      !req.body.password    ||
      !req.body.dob
    ) {
      errorHandler(
        422,
        'Missing required field: one of email, name, password, or dob.',
        req, res
      );
    } else {
      next();
    }
  }

  function checkPassword(req, res, next) {
    if (req.body.password.length < 5) {
      errorHandler(
        422,
        'Password field must have minimum of 5 characters.',
        req, res
      );
    } else {
      next();
    }
  }

  function checkDob(req, res, next) {
    var date = moment(req.body.dob, moment.ISO_8601);
    var eighteen_years_ago =
      moment().subtract(18, 'years').startOf('day');

    var valid = date.isValid();
    var flags = date.parsingFlags();

    // eval(locus)
    if (!valid && !flags.iso) {
      errorHandler(
        422,
        'dob invalid format: not in ISO 8601. ' +
        'See https://en.wikipedia.org/wiki/ISO_8601#Dates.',
        req, res
      );
    } else
    if (!valid && (flags.overflow !== -1)) {
      errorHandler(
        422,
        'dob invalid date part: year, month, or date.',
        req, res
      );
    } else
    if (date.isAfter(eighteen_years_ago)) {
      errorHandler(
        422,
        'dob invalid: you must be 18 to enter.',
        req, res
      );
    } else {
      next();
    }
  }

    function checkUserExists(req, res, next) {
      User.findOne({email: req.body.email}, function(err, user){
        if (user) {
            errorHandler(
              422,
              'User email already exists.',
              req, res
            );
        } else {
          next();
        }
      });
  }

  // function checkUserExists(req, res, next) {
  //   User.find({email: req.body.email}).exec()
  //     .catch(function(err) {
  //       next(err);
  //   }).then(function(users) {
  //       if (users.length > 0) {
  //         errorHandler(
  //           422,
  //           'User email already exists.',
  //           req, res
  //         );
  //       } else {
  //         next();
  //       }
  //   });
  // }

};
