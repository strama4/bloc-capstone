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
    },

    compileRecipeIngredients(recipes, userId, callback) {
        const names = Object.values(recipes); 
        // Will have to deal with the possibility of selecting the same recipe twice later.
        // Currently, the query will only return one instance of the recipe no matter how 
        // many times it appears in 'names'.
        Recipe.findAll({
            where: {
                name: names,
                userId
            }
        })
        .then((recipes) => {
            let ingredients = [];
            recipes.forEach((recipe) => {
                ingredients = ingredients.concat(recipe.ingredients);
            })
            
            const finalList = [];

            let j = 0;
            while (j < ingredients.length) {
                
                let match = false;
                for (let i = 0; i < finalList.length; i++) {
                    if (ingredients[j].item === finalList[i].item &&
                        ingredients[j].measurement === finalList[i].measurement) {
                            console.log('we got here at some point...')
                            finalList[i].qty = parseInt(finalList[i].qty) + parseInt(ingredients[j].qty)
                            match = true; 
                    } 
                }
                if (!match) {
                    finalList.push(ingredients[j])
                }
                j++;
            }
            console.log('the finallist:', finalList)
            callback(null, finalList);
        })
        .catch((err) => {
            callback(err);
        })
    }
}