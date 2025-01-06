const userModel = require('../models/user.model');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const isBlacklisted = await userModel.findOne({ token });
    if (isBlacklisted) {    
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' }); 
        }
        req.user = user;   
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}