const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Cookie nundi token techukovadam
    token = req.cookies.jwt;

    if (token) {
        try {
            // Token ni verify cheyadam
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // User details ni req.user lo pettadam (password thappa)
            req.user = await User.findById(decoded.userId).select('-password');

            next(); // Next step ki vellu
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };