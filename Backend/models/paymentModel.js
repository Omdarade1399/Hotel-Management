const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String, enum: ['Credit Card', 'PayPal', 'UPI'], required: true },
  payment_status: { type: String, enum: ['completed', 'failed', 'refunded'], default: 'completed' },
  payment_date: { type: Date, default: Date.now },
  payment_reference: { type: String, unique: true, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);