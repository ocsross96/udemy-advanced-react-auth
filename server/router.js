const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// create middleware / interceptor objects that occurs between incoming request and route handler
// session: false is to tell passport not to create a cookie base session for this request
const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ 'message': 'Super secret code is ABC123'});
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
