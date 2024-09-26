const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwtConfig');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.userId; // Save user ID to request for later use
        next();
    });
};
