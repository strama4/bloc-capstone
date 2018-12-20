const userQueries = require('../db/user.queries');
const passport = require('passport');

module.exports = {
    signUp(req, res, next) {
        res.render('user/signup');
    },

    createUser(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }

        userQueries.create(newUser, (err, user) => {
            if (err) {
                // flash error message of some kind
                res.redirect('/');
            } else {
                // flash success message
                res.redirect(303, '/'); // consider sending them back to where they came from
            }
        })
    },

    signInUser(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash('notice', 'Login failed. Please try again');
                return res.redirect(401, '/user/signin')
            }
            req.logIn(user, function(err){
                if (err) {
                    return next(err);
                }
                req.flash('notice', 'You\'ve successfully signed in!');
                res.redirect(303, '/');
            });
        })(req, res, next);
    },

    signIn(req, res, next) {
        res.render('user/signin')
    }
}