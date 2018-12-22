const Recipe = require('../db/models').Recipe;
const User = require('../db/models').User;

module.exports = {
    getRecipes(userId, callback) {
        if (!userId) {
            callback('You must be signed in to access recipes!');
        }
        Recipe.findAll({ where: {userId}})
        .then((recipes) => {
            callback(null, recipes);
        })
        .catch((err) => {
            callback(err);
        });
    }
}