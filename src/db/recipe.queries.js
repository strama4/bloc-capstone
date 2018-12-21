const Recipe = require('../db/models').Recipe;
const User = require('../db/models').User;

module.exports = {
    getRecipes(userId, callback) {
        Recipe.findAll({ where: {userId}})
        .then((recipes) => {
            callback(null, recipes);
        })
        .catch((err) => {
            callback(err);
        });
    }
}