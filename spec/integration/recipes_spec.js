const server = require('../../src/server');
const request = require('request');
const base = 'http://localhost:3000/recipes';

const User = require('../../src/db/models').User;
const Recipe = require('../../src/db/models').Recipe;

describe('Routes : Recipes', () => {
    beforeEach((done) => {
        this.user;
        User.create({
            email: 'johnnyboy@gmail.com',
            password: '123456789'
        })
        .then((user) => {
            this.user = user;
            const options = {
                url: 'http://localhost:3000/auth/fake',
                form: {
                    id: this.user.id,
                    email: this.user.email
                }
            }
            request.get(options, (err, res, body) => {
                done();
            })
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    })
    
    describe('GET /recipes', () => {
        it('should show no recipes for the user', (done) => {
            request.get(base, (err, res, body) => {
                expect(body).toContain('You have no recipes saved!');
                done();
            })
        });

        it('should show a recipe that the user has saved', (done) => {
            Recipe.create({
                name: 'PB & J Sammy',
                ingredients: [
                    {item: 'Peanut Butter', qty: '1', measurement: 'TBSP'},
                    {item: 'Jam', qty: '1', measurement: 'TBSP'},
                    {item: 'Bread', qty: '2', measurement: 'count'}
                ],
                userId: this.user.id
            })
            .then((recipe) => {
                request.get(base, (err, res, body) => {
                    expect(body).toContain('PB & J Sammy');
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should redirect to signin page when no user is found', (done) => {
            const options = {
                url: 'http://localhost:3000/auth/fake',
                form: {
                    id: -1
                }
            }
            request.get(options, (err, res, body) => {
                request.get(`${base}`, (err, res, body) => {
                    expect(res.statusCode).toBe(401);
                    expect(body).toContain('Redirecting');
                    done();
                });
            });
        });
    });

    describe('POST /recipes/create-list', () => {
        it('should return the recipe selected', (done) => {
            Recipe.create({
                name: 'PB & J Sammy',
                ingredients: [
                    {item: 'Peanut Butter', qty: '1', measurement: 'TBSP'},
                    {item: 'Jam', qty: '1', measurement: 'TBSP'},
                    {item: 'Bread', qty: '2', measurement: 'count'}
                ],
                userId: this.user.id
            })
            .then((recipe) => {
                const options = {
                    url: `${base}/create-list`,
                    form: {
                        'recipe-1': 'PB & J Sammy'
                    }
                }
                request.post(options, (err, res, body) => {
                    console.log('BODY WAS: ', body)
                    expect(body).toContain('Peanut Butter');
                    done();
                });
            })
        })
    });
});