const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // local strategy has passed the request
  // it pulls out the email and password and hands it to us in callback
  // verify username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is `password` === to user.password
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// setup options for JWT strategy
const jwtOptions = {
  // tell jwt strategy whenever a request comes in try and get the request header name 'authorization'
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create JWT strategy
// payload = decoded JWT token
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // see if the user id in the payload exists in our db
  // if it does call done with that user
  // otherwise call done without a user object
  User.findById(payload.sub, function (err, user) {
    if (err) { return done(err, false); }

    // user found
    if (user) {
      done(null, user);
    // user not found
    } else {
      done(null, false);
    }
  });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
