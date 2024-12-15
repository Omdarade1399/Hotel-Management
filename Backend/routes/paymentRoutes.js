const express = require('express');
const { createPayment, getAllPayments, getUserPayments } = require('../controllers/paymentController');

const router = express.Router();

router.post('/createPayment', createPayment);
router.get('/my-payments', getUserPayments);

module.exports = router;