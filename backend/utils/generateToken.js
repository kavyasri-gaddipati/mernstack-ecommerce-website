const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    // 1. Token Create Cheyadam
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    // 2. Cookie Set Cheyadam
    res.cookie('jwt', token, {
        httpOnly: true,
        // Live (Production) lo true, Local lo false undali
        secure: process.env.NODE_ENV === 'production', 
        // Live lo 'None', Local lo 'Strict'
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
    });
};

module.exports = generateToken;