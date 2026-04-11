const express = require("express");
const router = express.Router();

const authMiddleware = require("../dashboard/dashboard.controller.js");
const delPost = require("../controllers/deletePost.controller.js");

// ✅ correct
router.get("/render", authMiddleware);
router.delete("/del/:id", delPost);

module.exports = router;