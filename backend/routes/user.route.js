const express = require('express');
const router = express.Router();


const authMiddleware = require('../middleware/auth.middleware');

const login = require('../controllers/login.controller');
const signup = require('../controllers/signup.controller');
const logout=require('../controllers/logout.controller');

// Routes
router.post('/login', login);
router.post('/signup', signup);

router.post('/logout',logout)

module.exports = router;