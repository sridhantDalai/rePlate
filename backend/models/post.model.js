const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    usernameID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        required: true,
        type: String,
    },
    phone: {
        required: true,
        type: Number,
    },
    email: {
        required: true,
        type: String,
    },
    time: {
        required: true,
        type: String,
    }
},
    { timestamps: true })

const Post = mongoose.model("Post", postSchema);
module.exports = Post;