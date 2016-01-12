var moment = require('moment'),
    User   = require('../models/user'),
    jwt  = require('jsonwebtoken');

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

  app.post('/api/searchUsers',

    checkForToken,
    validateToken,

    function(req, res, next) {
      // var searchEmail = req.get('email');
      var searchEmail = req.body.email;
      User.findOne({email: searchEmail}, function(err, user){
          if (user) {
            res.json(user);
          }
          else {
            res.send('User cannot be found');
          }
    });
  });

  app.post('/api/addAddress',

    checkForToken,
    validateToken,

    function(req, res, next) {

      User.findOne({email: req.decoded.email}, function(err, user){
          if (user) {
            user.address = req.body.address;
            if (user.voteInfo == undefined) {
              user.points += 5;
            }
            user.voteInfo = {
              hasSearched: true,
              myLocationName: req.body.pollingLocation.address.locationName,
              myLocationStreet: req.body.pollingLocation.address.line1,
              myLocationCity: req.body.pollingLocation.address.city,
              myLocationState: req.body.pollingLocation.address.state,
              myLocationZip: req.body.pollingLocation.address.zip,
              myVoteUrl: req.body.state.electionAdministrationBody.electionRegistrationUrl,
              elections: req.body.elections
              // elections: {
              //   race: req.body.elections.office,
              //   district: req.body.elections.
              // },
            };
            user.save(function(err){
              res.json({
                success: true,
                message: 'Successfully added address.',
                data: user
              });
            });
          }
          else {
            res.send('User cannot be found');
          }
      });
    });


  app.post('/api/clickedCandidate',
    checkForToken,
    validateToken,
    function(req, res, next) {

      User.findOne({email: req.decoded.email}, function(err, user){
          if (user) {
            var notClickedYet = true;
            user.voteInfo.researchedCandidates.forEach(function(election) {
              if (election.race == req.body.race) {
                notClickedYet = false;
                var noCandidate = true;
                election.clickedCandidates.forEach(function(candidate){
                  if (candidate == req.body.name) {
                    noCandidate = false;
                  }
                });
                if (noCandidate) {
                  election.clickedCandidates.push(req.body.name);
                  user.points++;
                  if (req.body.party == "Democratic") {
                    election.clickedDem = true;
                  } else if (req.body.party == "Republican") {
                    election.clickedRep = true;
                  } else {
                    election.clickedIn = true;
                  }
                  user.points += 3;
                }
              }
            });
            if (notClickedYet) {
              user.points++;
              if (req.body.party == "Democratic") {
                user.voteInfo.researchedCandidates.push({
                  race: req.body.race,
                  clickedDem: true,
                  clickedCandidates: [req.body.name]
                });
              } else if (req.body.party == "Republican") {
                 user.voteInfo.researchedCandidates.push({
                  race: req.body.race,
                  clickedRep: true,
                  clickedCandidates: [req.body.name]
                });
              } else {
                user.voteInfo.researchedCandidates.push({
                  race: req.body.race,
                  clickedIn: true,
                  clickedCandidates: [req.body.name]
                });
              }
            }
            user.save(function(err){
              res.json({
                success: true,
                message: 'Successfully added candidate click.',
                data: user
              });
            });
          }
      });
    });

  app.post('/api/followUser',

    checkForToken,
    validateToken,

    function(req, res, next) {
      // var searchEmail = req.get('email');
      var searchEmail = req.body.email;
      var foundFriend = false;
      User.findById(req.body.id, function(err, friend){
          if (friend) {
            User.findOne({email: req.decoded.email}).exec()
            .then(function(user) {
              user.friends.forEach(function(currentFriend) {
                if (currentFriend.userId == friend._id) {
                  foundFriend = true;
                }
              });
            // })
            // .then(function(user) {
              if (!foundFriend) {
                user.friends.push({
                  firstName: friend.firstName,
                  lastName: friend.lastName,
                  userId: friend._id,
                  points: friend.points
                });
                user.save(function(err){
                  res.json({
                    success: true,
                    message: 'Successfully added friend.',
                    data: user
                  });
                });
              } else {
                  res.json({
                    message: 'Friend already added',
                    data: user
                  });
              }
            });
          }
          else {
            res.json({
              message: 'Friend now found',
              data: user
            });
          }
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

  function checkForToken(req, res, next) {
    var authorizationHeader = req.get('Authorization'),
        method,
        token;

    // conditionally set all the variables...
    if (authorizationHeader) authorizationHeader = authorizationHeader.split(' ');
    if (authorizationHeader && authorizationHeader.length > 0) {
      method = authorizationHeader[0];
    }
    if (authorizationHeader && authorizationHeader.length > 1) {
      token = authorizationHeader[1];
    }

    if (!authorizationHeader) {
      errorHandler(
        400,
        'Authorization failed (invalid_request): missing necessary header. ' +
        'See https://tools.ietf.org/html/rfc6750#section-2.1',
        req, res
      );
    } else
    if (method.toLowerCase() !== 'bearer' && method.toLowerCase() !== 'token') {
      errorHandler(
        400,
        'Authorization failed (invalid_request): Authorization method ' +
        'must be \'bearer\' or \'token.\'',
        req, res
      );
    } else
    if (!token) {
      errorHandler(
        401,
        'Authorization failed (invalid_token): token missing.',
        req, res
      );
    } else {
      // add the token to the request
      req.token = token;
      next();
    }
  }

  function validateToken(req, res, next) {
    jwt.verify(req.token, app.get('secret-key'), function(err, decoded) {
      if (err && err.name === 'TokenExpiredError') {
        errorHandler(
          401,
          'Authorization failed (invalid_token): token epired at ' + err.expiredAt + '.',
          req, res
        );
      } else
      if (err) {
        errorHandler(
          401,
          'Authorization failed (invalid_token): token malformed.',
          req, res
        );
      } else {
        // add the decoded token to the request
        req.decoded = decoded;
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
