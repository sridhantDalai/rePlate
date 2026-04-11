const postFoodModel = require('../models/post.model');
const User=require('../models/user.model');


const createPost = async (req, res) => {
   const {name,image,price, manufactureDate,expiryDate,storageTemp,sealed,acidic,nutrition, uploader}=req.body;
   console.log('igamge',image);

     const name1=uploader.name;
    const phone=uploader.phone;
     const location=uploader.location;



   const userId = req.userId;


   const object={
    userid:userId,
    itemList:name,
    imgFood:image,
    price,
    dateOfPrep:manufactureDate,
    expiryDate,
    storageTemp,
    name:name1,
    phone,
    location,
    isSealed:sealed,
    isAcidic:acidic,
   }
  console.log('reached2')
    const post = await postFoodModel.create(object);


      await User.findByIdAndUpdate(
      userId,
      {
        $push: { postID: post._id }
      },
      { new: true }
    );
    res.status(200).json({
        "success": true,
        'message': 'new post created',
        'post': post
    })
}
module.exports = createPost;