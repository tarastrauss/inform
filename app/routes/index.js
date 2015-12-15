var express         = require('express');
var router          = express.Router();
// var passport        = require('passport');
var userController  = require('../controllers/users');
var request         = require('request');


module.exports = function (app, passport) {

    app.use('/', router);
    app.get('api/secured/*',
        function (req, res, next) {
            // Need to filter anonymous users somehow
            if (!req.user) {
                return res.json({ error: 'This is a secret message, login to see it.' });
            }
            next();
        },
        function (req, res) {
            res.json({ message: 'This message is only for authenticated users' });
        });


    app.get('api/*', function (req, res) {
        res.json({ message: 'This message is known by all' });
    });

    app.get('api/user/:id', userController.currentUser);

    app.get('/*', function (req, res) {
        res.render('index', { user: req.user ? req.user : null });
    });

    router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    router.get('/auth/facebook/callback', passport.authenticate('facebook',
      { successRedirect: '/auth/success', failureRedirect: '/auth/failure' }));

    router.get('/auth/success', function(req, res) {
        res.redirect('/');
        res.json('after-auth',
          { state: 'success', user: req.user ? req.user : null });
    });
    router.get('/auth/failure', function(req, res) {
        res.json('after-auth', { state: 'failure', user: null });
    });

    router.get('/logout', function(req, res) {
      req.logout();
      // res.writeHead(200);
      res.redirect('/');
      // res.end();
    });
};

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  // res.redirect('/auth/facebook');
}
