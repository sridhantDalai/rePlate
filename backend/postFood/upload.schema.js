const mongoose = require('mongoose');

const postFoodSchema = new mongoose.Schema({    

    itemList : {
        type : String,
        required : true,
    },

    imgFood : {
        type : String,
        required : true,
    },

    price: {
        type: String,
        default: "Free",
        enum: ["Free"],
        required: true
    },
    
    dateOfPrep : {
        type : String,
        required : true,
    },
    
    expiryDate : {
        type : String,
        required : true,
    },
    
    storageTemp : {
        type : String,
        required : true,
    },  
    
    name : {
        type : String,
        required : true,
    },   
    
    
    phone : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },  

    location : {
        type : String,
        required : true,
    },      

    isSealed : {
        type : Boolean,
        required : true,
    },
    
    
    isAcidic : {
        type : Boolean,
        required : true,
    },     

});

delete mongoose.models.postFoodModel;

const postFoodModel = mongoose.model("postFoodModel", postFoodSchema);
module.exports = postFoodModel;
