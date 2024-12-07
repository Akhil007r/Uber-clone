const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controllers')
router.post('/register',[
    body('email').isEmail().withMessage('Invalid E-mail'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First Name must be at least 3 letter'),
    body('password').isLength({min: 5 }).withMessage('Password must be a tleast 5 letter')
],
userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid E-mail'),
    body('password').isLength({min: 5 }).withMessage('Password must be atleast 5 letter')
],
userController.loginUser
)
module.exports = router;