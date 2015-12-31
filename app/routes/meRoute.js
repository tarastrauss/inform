var jwt  = require('jsonwebtoken'),
    User = require('../models/user');

// In order to simplify our process, we will handle the request
// inline here, instead of passing to controller files.
module.exports = function(app, errorHandler) {

  // User creation path:
  app.get('/api/me',

    // validations
    checkForToken,
    validateToken,

    // authorizing the resource is not necessary, since this route
    // is always for the current user!

    // get user info
    function(req, res, next) {
      console.log('Request made to /me with token:', req.decoded);

      User.findOne({email: req.decoded.email}).exec()
        .then(function(user) {
          res.json({
            success: true,
            message: 'Successfully retrieved user data.',
            data: user
          });
      }).catch(function(err) {
          next(err);
      })
  });

  app.post('/api/me',
    checkForToken,
    validateToken,

    function(req, res, next) {
      User.findOne({email: req.decoded.email}, function(err, currentUser) {
          currentUser.points = req.body.points;
          currentUser.save(function(err){
            res.json({
              success: true,
              message: 'Successfully updated user points.',
              data: currentUser
            });
          });

      // User.findById(req.user.id).exec()
      //   .then(function(user) {
      //     user.level = req.body.level;
      //     user.save(function(err){
      //       res.json({
      //         success: true,
      //         message: 'Successfully updated user level.',
      //         data: user.level
      //       });
      //     });
      //   });
    });
  });


  // *** VALIDATIONS ***

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

};
