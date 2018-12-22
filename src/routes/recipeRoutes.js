const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getRecipes);
router.get('/recipes/new') // to go to recipe creation page
router.post('/recipes/create-list', recipeController.getRecipeFormData) // to create a new recipe (does it have to be post??)

module.exports = router;