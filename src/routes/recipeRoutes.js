const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');
const validations = require('../routes/validations');

router.get('/recipes', recipeController.getRecipes);
router.get('/recipes/new', recipeController.getNewRecipePage); // to go to recipe creation page
router.post('/recipes/create-list', recipeController.getRecipeFormData); // to create a new recipe (does it have to be post??)
router.post('/recipes/new', validations.addNewRecipe, recipeController.createNewRecipe);

module.exports = router;