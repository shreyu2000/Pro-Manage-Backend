const express = require('express');
const router = express.Router();
const { registerUser, loginUser ,updateUserSettings } = require('../controllers/user.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// Route to update user settings
router.put('/settings', authMiddleware, updateUserSettings);

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;
