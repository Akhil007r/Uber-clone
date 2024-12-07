const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult } = require('express-validator');


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } );
    };
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

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(400).json({ error: 'Invalid Email or Password' });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(400).json({ error: 'Invalid Email or Password' });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
}
