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
    },

    addRecipe(recipe, userId, callback) {
        if (!userId) {
            callback('You must be signed in to do that!');
        }

        const ingredients = [];
        for (let i = 0; i < recipe.ingredientName1.length; i++) {
            ingredients.push({
                item: recipe.ingredientName1[i],
                qty: recipe.ingredientQty1[i],
                measurement: recipe.ingredientMeasure1[i]
            })
        }
        const newRecipe = {
            name: recipe.recipeTitle,
            ingredients: ingredients,
            userId: userId
        };

        Recipe.create(newRecipe)
        .then((recipe) => {
            callback(null, recipe);
        })
        .catch((err) => {
            callback(err);
        })
    }
}