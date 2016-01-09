var jwt  = require('jsonwebtoken'),
    User = require('../models/user'),
    request = require('request'),
    moment = require('moment');


module.exports = function(app, errorHandler) {

  app.post('/api/search',

        // validations
    checkForToken,
    validateToken,

    function(req, res, next) {
      // console.log('Request made to /search with token:', req.decoded);

      // User.findOne({email: req.decoded.email}).exec()
      //     .then(function(user) {
      //       res.json({
      //         success: true,
      //         message: 'Successfully retrieved user data for search.',
      //         data: user
      //       });
      //   }).catch(function(err) {
      //       next(err);
      //   });

      var uri = 'http://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=' +
        process.env.ALCHEMY_KEY + '&outputMode=json&start=now-1d&end=now&count=40&q.enriched.url.enrichedTitle.keywords.keyword.text=' +
        req.body.parameter + '&return=enriched.url.url,enriched.url.author,enriched.url.publicationDate.date,enriched.url.title,enriched.url.enrichedTitle.docSentiment';

      request.get(uri, function(err, response, body) {
        var body = JSON.parse(body);

        // Call res.send in the API request's callback*!
        res.json(body);
      });

    });

  app.post('/api/searchVote',

    checkForToken,
    validateToken,

    function(req, res, next) {

      var googleURI = 'https://www.googleapis.com/civicinfo/v2/voterinfo?key='+ process.env.GOOGLE_CIVICS_KEY + '&address=' + req.body.address + '&electionId=2000';
      // var googleURI = 'https://www.googleapis.com/civicinfo/v2/elections?key='+ process.env.GOOGLE_CIVICS_KEY;
      request.get(googleURI, function(err, response, body) {
        if (err) {
          res.json(err)
        } else {
          var body = JSON.parse(body);
          res.json(body);
        }
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
