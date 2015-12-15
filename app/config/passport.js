var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
          clientID: process.env.FACEBOOK_ID,
          clientSecret: process.env.FACEBOOK_SECRET,
          callbackURL: process.env.FACEBOOK_CALLBACK,
          enableProof: true,
          profileFields: ['id', 'first_name', 'last_name', 'age_range', 'picture', 'email']
      },
      function(accessToken, refreshToken, profile, done) {
          User.findOne({ 'facebookId': profile.id }, function (err, user) {
              if (err) { return done(err); }
              if (!user) {
                  user = new User({
                      firstName: profile.first_name,
                      lastName: profile.last_name,
                      email: profile.emails[0].value,
                      facebookId: profile.id,
                      picture: profile.picture,
                      age: profile.age_range
                  });
                  user.save(function (err) {
                      if (err) {
                          console.log(err);
                      }
                      return done(err, user);
                  });
              } else {
                  return done(err, user);
              }
          });
      }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
        done(err, user);
    });
  });
}



