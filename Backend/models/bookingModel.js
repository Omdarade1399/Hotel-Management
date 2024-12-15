const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  room_number: { type: String, required: true },
  check_in_date: { type: Date, required: true },
  check_out_date: { type: Date, required: true },
  status: { type: String, enum: ['booked', 'checked_in', 'checked_out', 'canceled'], default: 'booked' },
  total_price: { type: Number, required: true },
  payment_status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);