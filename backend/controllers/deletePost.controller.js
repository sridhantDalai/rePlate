const postFoodModel = require('../models/post.model');
const User=require('../models/user.model');


const delPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await postFoodModel.deleteOne({ _id: id });
        res.status(200).json({
            "success": true,
            'message': 'post deleted successfully',
            'post': post
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}
module.exports = delPost;