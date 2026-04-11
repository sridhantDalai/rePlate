const express = require('express');
const multer = require('multer');
const { addFood } = require('../postFood/upload.controller.js');
const { getAllFood, getFoodByEmail } = require('../postFood/fetch.controller.js');

const router = express.Router();

// ✅ multer setup (stores temp file)
const upload = multer({ dest: 'uploads/' });

// ✅ route with file upload
router.post('/res', upload.single('imgFood'), addFood);

router.get('/all', getAllFood);
router.get('/email/:email', getFoodByEmail);

module.exports = router;