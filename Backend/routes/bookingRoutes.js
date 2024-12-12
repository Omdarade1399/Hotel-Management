const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/createBooking', createBooking);
router.get('/getBookings', getBookings);

module.exports = router;