const jwt = require('jsonwebtoken');        // 验证令牌
const { jwtKey } = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, jwtKey);
        req.userData = decoded;
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

    next();
}