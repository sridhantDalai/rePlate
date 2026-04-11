const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        else if (user.password !== password) {
            return res.status(401).json({
                "success": false,
                'message': 'Incorrect password'
            })
        }
        else {
            const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY_JWT)
            res.cookie('token', token);
            res.status(200).json({
                "success": true,
                'message': 'login successfully'
            })

        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = login;