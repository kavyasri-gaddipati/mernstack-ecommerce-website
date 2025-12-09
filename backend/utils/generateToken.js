const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d' // 30 days valid untundi
    });

    
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // HTTPS lo ne work avtundi production lo
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
    });
};

module.exports = generateToken;