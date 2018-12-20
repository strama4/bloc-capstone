const server = require('../../src/server');
const request = require('request');
const base = 'http://localhost:3000'

const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;

describe('Routes : User', () => {
    this.user;
    beforeEach((done) => {
        sequelize.sync({ force: true }).then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe('POST /user/signup', () => {
        it('should register a new User object', (done) => {
            const options = {
                url: `${base}/user/signup`,
                form: {
                    email: 'johnnyboy@gmail.com',
                    password: '123456789',
                    confirmPassword: '123456789'
                }
            }
            request.post(options, (err, res, body) => {
                expect(err).toBeNull();
                expect(res.statusCode).toBe(303);
                
                User.findOne(
                    { where: {email: 'johnnyboy@gmail.com'}}
                )
                .then((user) => {
                    expect(user).not.toBeNull();
                    expect(user.email).toBe('johnnyboy@gmail.com');
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
                done();
            });
        });

        it('should not register a new User if password does not match', (done) => {
            const options = {
                url: `${base}/user/signup`,
                form: {
                    email: 'johnnyboy@gmail.com',
                    password: '123456789',
                    confirmPassword: '123456'
                }
            }
            request.post(options, (err, res, body) => {
                User.findOne(
                    { where: {email: 'johnnyboy@gmail.com'}}
                )
                .then((user) => {
                    expect(user).toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe('POST /user/signin', () => {
        it('should allow the user to continue with valid credentials', (done) => {
            const signUp = {
                url: `${base}/user/signup`,
                form: {
                    email: 'example@example.com',
                    password: 'thisisabadpassword',
                    confirmPassword: 'thisisabadpassword'
                }
            }
            request.post(signUp, (err, res, body) => {
                const options = {
                    url: `${base}/user/signin`,
                    form: {
                        email: 'example@example.com',
                        password: 'thisisabadpassword'
                    }
                }
                request.post(options, (err, res, body) => {
                    expect(res.statusCode).toBe(303);
                    expect(body).toContain('Signed in as example@example.com');
                    done();
                });
            })
        });

        it('should not allow someone that is not a user to login', (done) => {
            const options = {
                url: `${base}/user/signin`,
                form: {
                    email: 'animposter@example.com',
                    password: 'muahahahaha'
                }
            }
            request.post(options, (err, res, body) => {
                expect(res.statusCode).toBe(401);
                done();
            });
        });
    });
});