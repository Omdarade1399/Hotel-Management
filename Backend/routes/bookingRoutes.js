const express = require('express');
const { createBooking, getBookings, cancelBooking } = require('../controllers/bookingController');
const router = express.Router();

router.post('/createBooking', createBooking);
router.get('/getBookings', getBookings);
router.delete('/cancelBooking/:id', cancelBooking);

module.exports = router;