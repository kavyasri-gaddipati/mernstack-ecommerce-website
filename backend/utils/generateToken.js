const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,      // Render HTTPS kabatti TRUE undali
        sameSite: 'None',  // Cross-site (Vercel -> Render) kabatti NONE undali
        maxAge: 30 * 24 * 60 * 60 * 1000 
    });
};

module.exports = generateToken;