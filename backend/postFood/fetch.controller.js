const postFoodModel = require("./upload.schema.js");

// ✅ get all data
const getAllFood = async (req, res) => {
  try {
    const foods = await postFoodModel.find();

    res.json({
      success: true,
      data: foods,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching data" });
  }
};

// ✅ get by email
const getFoodByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const foods = await postFoodModel.find({ email });

    res.json({
      success: true,
      data: foods,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching data" });
  }
};

module.exports = { getAllFood, getFoodByEmail };