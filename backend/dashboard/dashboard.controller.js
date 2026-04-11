const jwt = require('jsonwebtoken');
const User=require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            'message': 'token is not present'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
        username = decoded.username;

        if (!username) {
            return res.status(401).json({
                success: false,
                'message': 'Invalid token'
            })
        }
        else {
             const user = await User.findOne({ username });
             req.email = user.email;
             res.json({
                success: true,
                message: "Token is valid",
                email: user.email
            });
            next();
        }
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}
module.exports = authMiddleware;