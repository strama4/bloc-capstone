const userQueries = require('../db/user.queries');

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
                res.redirect('/user/signup');
            } else {
                // flash success message
                res.redirect(303, '/'); // consider sending them back to where they came from
            }
        })
    }
}