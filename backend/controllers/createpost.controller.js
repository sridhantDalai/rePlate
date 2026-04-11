const Post = require('../models/post.model');

const createPost = async (req, res) => {
   const {image,phone,email}=req.body;
   const userId = req.userId;

    const post = await Post.create({});
    res.status(200).json({
        "success": true,
        'message': 'new post created',
        'user': post
    })
}
module.exports = createPost;