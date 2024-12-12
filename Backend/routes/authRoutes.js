const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const router = express.Router();

router.post('/registerUser', registerUser);
router.get('/loginUser', loginUser);
router.get('/profile', getUserProfile);

module.exports = router;