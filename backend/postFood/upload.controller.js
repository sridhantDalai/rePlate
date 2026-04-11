const postFoodModel = require("./upload.schema.js");
const cloudinary = require("cloudinary").v2;

// config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRECT,
});

const addFood = async (req, res) => {
  try {
    const data = req.body;

    // 👇 ADD HERE
    if (!data.email) {
      return res.json({ error: "EMAIL NOT RECEIVED" });
    }   
    
    console.log("BODY:", req.body);

    // ✅ file from multer
    const file = req.file; 

    if (!file) {
      return res.status(400).json({ message: "Image required" });
    }
    
          // ✅ email ka username part (before @)
      const emailName = data.email.split("@")[0];

      // ✅ user name clean
      const userName = data.name.toLowerCase().replace(/[^a-z0-9]/g, "");

      // ✅ date format → DDMMYY (110426)
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = String(now.getFullYear()).slice(-2);

      const timeStamp = `${day}${month}${year}`;

      // ✅ final filename
      const fileName = `${emailName}_${userName}_${timeStamp}`;

    // ✅ upload buffer to cloudinary
    const uploadRes = await cloudinary.uploader.upload(file.path, {
      folder: "food-items",
      public_id: fileName, // 👈 custom name
    });

    const imageUrl = uploadRes.secure_url;

    const food = await postFoodModel.create({
    itemList: data.itemList || "default",

    imgFood: imageUrl,

    dateOfPrep: data.dateOfPrep || "",
    expiryDate: data.expiryDate || "",
    storageTemp: data.storageTemp || "",

    name: data.name || "",
    phone: data.phone || "",
    email: data.email || "",
    location: data.location || "",

    // ✅ FIX BOOLEAN
    isSealed: data.isSealed === "true",
    isAcidic: data.isAcidic === "true",
    });


    res.json({ success: true, data: food });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = { addFood };