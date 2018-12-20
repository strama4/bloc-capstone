const authHelper = require('../auth/authHelper');
const User = require('./models').User;

module.exports = {
    create(newUser, callback) {
        const hashedPassword = authHelper.hashPassword(newUser.password);

        User.create({
            email: newUser.email,
            password: hashedPassword
        })
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        });
    }
}