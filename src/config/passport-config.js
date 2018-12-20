const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authHelper = require('../auth/authHelper');

const User = require('../db/models').User;

module.exports = {
    init(app) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new LocalStrategy({
            usernameField: 'email'
        },
            (email, password, done) => {
              User.findOne({ where: { email }})
              .then((user) => {
                  if (!user || !authHelper.confirmPassword(password, user.password)) {
                    return done(null, false, { message: 'Incorrect username or password' });
                  }
                  return done(null, user);

              })
            }
        ));
            

        passport.serializeUser(function(user, callback) {
            callback(null, user.id);
        });
        
        passport.deserializeUser(function(id, callback) {
            User.findByPk(id)
            .then((user) => {
                callback(null, user);

            })
            .catch((err) => {
                callback(err, user);
            })
            
        });
    }
}