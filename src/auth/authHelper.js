const bcrypt = require('bcryptjs');

module.exports = {
    hashPassword(password) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    },

    confirmPassword(password, databasePassword) {
        return bcrypt.compareSync(password, databasePassword);
    }
}