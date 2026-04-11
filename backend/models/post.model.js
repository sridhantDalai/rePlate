const mongoose = require('mongoose');

const postFoodSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    itemList: {
        type: String,
        required: true,
    },

    imgFood: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        default: "Free",
        enum: ["Free"],
        required: true
    },

    dateOfPrep: {
        type: String,
        required: true,
    },

    expiryDate: {
        type: String,
        required: true,
    },

    storageTemp: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },


    phone: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    isSealed: {
        type: Boolean,
        required: true,
    },


    isAcidic: {
        type: Boolean,
        required: true,
    },

});

const postFoodModel = mongoose.model('postFoodModel', postFoodSchema);
module.exports = postFoodModel;