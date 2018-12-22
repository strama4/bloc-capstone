const sequelize = require('../../src/db/models/index').sequelize;
const Recipe = require('../../src/db/models').Recipe;
const User = require('../../src/db/models').User;

describe('Recipe', () => {
    beforeEach((done) => {
        this.user;
        sequelize.sync({ force: true }).then(() => {
            User.create({
                email: 'johnnyboy@gmail.com',
                password: '123456789'
            })
            .then((user) => {
                this.user = user;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe('#create', () => {
        it('should create a new Recipe object associated with current user', (done) => {
            Recipe.create({
                name: 'Chili Garlic Tofu', 
                ingredients: [
                    {item: 'Garlic'},
                    {item: 'Tofu'},
                    {item: 'Chili paste'}
                ],
                userId: this.user.id
            })
            .then((recipe) => {
                expect(recipe).not.toBeNull();
                expect(recipe.name).toBe('Chili Garlic Tofu');
                expect(recipe.ingredients).toBeDefined();
                expect(recipe.userId).toBe(this.user.id);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should not create a new Recipe object without a name', (done) => {
            Recipe.create({
                ingredients: [
                    {item: 'Garlic'},
                    {item: 'Tofu'},
                    {item: 'Chili paste'}
                ] 
            })
            .then((recipe) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain('Recipe.name');
                done();
            });
        });
    });
});