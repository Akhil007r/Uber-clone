const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');


module.exports.registerUser = async (req, res, next) => {
    console.log(req, '>req')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } );
    };
    console.log(req.body, '>>');
    const { fullname: { firstname, lastname }, email, password }= req.body;
    const hashedPassword = await userModel.hashPassword(password)
    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}