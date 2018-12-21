const recipeQueries = require('../db/recipe.queries');

module.exports = {
    getRecipes(req, res, next) {
        recipeQueries.getRecipes(req.params.id, (err, recipes) => {
            if (err) {
                req.flash('error', 'Oops');
                res.redirect('/');
            } else {
                res.render('recipe/recipes', {recipes})
            }
        })
    }
}