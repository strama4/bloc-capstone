module.exports = {
    createUser(req, res, next) {
        if (req.method === "POST") {
            req.checkBody('email', 'Email must be a valid email address').isEmail();
            req.checkBody('password', 'Password must be at least 6 characters in length').isLength({min: 6});
            req.checkBody('confirmPassword', 'Password confirmation must match password').matches(req.body.password);
        }

        const errors = req.validationErrors();    

        if (errors) {
            console.log('erorrs', errors)
            req.flash('error', errors);
            res.redirect(303, req.headers.referer);
        } else {
            return next();
        }

    }
}