const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const validations = require('../routes/validations');

router.get('/user/signup', userController.signUp);
router.post('/user/signup', validations.createUser, userController.createUser);
router.post('/user/signin', userController.signInUser);
router.get('/user/signin', userController.signIn);

module.exports = router;