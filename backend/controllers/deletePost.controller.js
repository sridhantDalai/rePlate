const postFoodModel = require('../models/post.model');
const User = require('../models/user.model');

const delPost = async (req, res) => {
  try {
    const id = req.params.id;


    // 🔹 1. Check if post exists
    const post = await postFoodModel.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // 🔹 2. Delete post
    await postFoodModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (err) {
    console.error("Delete Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = delPost;