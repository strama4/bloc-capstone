const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');

router.get('/:id/recipes', recipeController.getRecipes);
router.get('/recipes/new') // to go to recipe creation page
router.post('/recipes/create-list') // to create a new recipe (does it have to be post??)

module.exports = router;