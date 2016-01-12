var jwt  = require('jsonwebtoken'),
    User = require('../models/user'),
    News = require('../models/news'),
    request = require('request'),
    moment = require('moment');


module.exports = function(app, errorHandler) {

  app.post('/api/search',

        // validations
    // checkForToken,
    // validateToken,

    function(req, res, next) {
      var uri = 'http://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=' +
            process.env.ALCHEMY_KEY + '&outputMode=json&start=now-1d&end=now&count=40&q.enriched.url.enrichedTitle.keywords.keyword.text=' +
            req.body.parameter + '&return=enriched.url.url,enriched.url.author,enriched.url.publicationDate.date,enriched.url.title,enriched.url.enrichedTitle.docSentiment';
      var param = req.body.parameter;

      News.findOne({query: param}, function(err, news){
        if (news) {
          console.log('the news is ', news);
          var oneDayMore = moment(news.searchedAt).add(1, 'days');
          var now = moment();
          if (now.isBefore(oneDayMore)) {
            res.json({
              apiCall: false,
              results: news,
              status: 'OK'
            });
          } else {
            request.get(uri, function(err, response, body) {
              // var body = JSON.parse(body);
              news.searchedAt = now;
              news.articles = [];
              body.docs.forEach(function(article) {
                news.articles.push({
                  headline: article.source.enriched.url.title,
                  author: article.source.enriched.url.author,
                  link: article.source.enriched.url.url,
                  date: article.source.enriched.url.publicationDate,
                  sentiment: article.source.enriched.url.enrichedTitle.docSentiment.type
                });
              })
              news.save(function(err){
                res.json({
                  apiCall: true,
                  results: news,
                  status: body.satus
                });
              });
            });
          }
        } else {
          request.get(uri, function(err, response, body) {
            var body = JSON.parse(body);
            console.log('the status is', body.status);
            // console.log('the docs are', body.result.docs);
            if (body.status != 'OK') {
              res.json({
                  apiCall: true,
                  status: body.status
              });
            } else {
              News.create({
                query: param,
                searchedAt: moment()
              }).then(function(newNews) {
                body.result.docs.forEach(function(article) {
                  console.log('adding article: ', article.source.enriched.url.title);
                  newNews.articles.push({
                    headline: article.source.enriched.url.title,
                    author: article.source.enriched.url.author,
                    link: article.source.enriched.url.url,
                    date: article.source.enriched.url.publicationDate.date,
                    sentiment: article.source.enriched.url.enrichedTitle.docSentiment.type
                  });
                });
                newNews.save(function(err){
                  res.json({
                    apiCall: true,
                    results: newNews,
                    status: body.status
                  });
                });
              });
            }
          });
        }
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
