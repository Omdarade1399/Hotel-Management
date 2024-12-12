const express = require('express');
const { createPayment, getAllPayments, getUserPayments } = require('../controllers/paymentController');

const router = express.Router();

// Route to create a payment
router.post('/createPayment', createPayment);

// Route to get all payments (admin only)
router.get('/getAllPayments', getAllPayments);

// Route to get payments for the logged-in user
router.get('/my-payments', getUserPayments);

module.exports = router;