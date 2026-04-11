
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { username,email, password } = req.body;
    try {
        if (!username || !password || !email) {
            return res.status(400).json({
                success: false,
                message: "Username, password and email  are required"
            });

        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({
                "success": false,
                'message': 'user allready exist'
            })
        }
         const user2 = await User.findOne({ email });
        if (user2) {
            return res.status(409).json({
                "success": false,
                'message': 'user whith this email allready exist'
            })
        }
        else {
            const newUser = await User.create({ username,email, password });
            const token = jwt.sign({ username }, process.env.SECRET_KEY_JWT)
            res.cookie('token', token);
            res.status(201).json({
                "success": true,
                'message': `new user created ${newUser._id}`
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
module.exports = signup;