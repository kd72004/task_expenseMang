const express = require('express');
const { signup, login, getProfile, getAllUsers } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.get('/users', protect, getAllUsers);

module.exports = router; 