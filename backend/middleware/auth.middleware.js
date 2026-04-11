const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
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
            return req.userId = username._id;
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