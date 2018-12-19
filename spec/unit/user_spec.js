const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;

describe('User', () => {
    beforeEach((done) => {
        sequelize.sync({ force: true }).then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe('#create', () => {
        it('should create a User object', (done) => {
            User.create({
                email: 'johnnyboy@gmail.com',
                password: '123456789'
            })
            .then((user) => {
                expect(user).not.toBeNull();
                expect(user.email).toBe('johnnyboy@gmail.com');
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should not create a User without both valid fields', (done) => {
            User.create({
                email: 'johnnyboyatgmail.com',
                password: '1234456'
            })
            .then((user) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain('User.email');
                done();
            });
        });

        it('should not create a user if missing one of the fields', (done) => {
            User.create({
                email: 'johnnyboy@gmail.com'
            })
            .then((user) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain('User.password');
                done();
            });
        });

        it('should not create a user if the email address is already taken', (done) => {
            User.create({
                email: 'johnnyboy@gmail.com',
                password: '123445667'
            })
            .then((user) => {
                User.create({
                    email: 'johnnyboy@gmail.com',
                    password: 'someotherpassword'
                })
                .then((newUser) => {
                    done()
                })
                .catch((err) => {
                    expect(err.message).toContain('Validation error');
                    done();
                });
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
});