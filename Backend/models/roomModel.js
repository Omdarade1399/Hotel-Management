const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room_type: { type: String, required: true, enum: ['Single', 'Double', 'Suite'] },
  room_number: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  description: { type: String },
  max_occupancy: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', roomSchema);