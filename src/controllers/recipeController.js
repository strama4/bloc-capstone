const recipeQueries = require('../db/recipe.queries');

module.exports = {
    getRecipes(req, res, next) {
        if (req.user) {
            recipeQueries.getRecipes(req.user.id, (err, recipes) => {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Oops');
                    res.redirect('/');
                } else {
                    res.render('recipe/recipes', {recipes: recipes, clickHandler: "launch()"});
                }
            });
        } else {
            req.flash('error', 'You must signed in to do that!');
            res.redirect(401, '/user/signin');
        }
    },
    getRecipeFormData(req, res, next) {
        res.render('recipe/shoppingList', {result: req.body});
    }
}