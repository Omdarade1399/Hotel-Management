const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

exports.createBooking = async (req, res) => {
  const { user_id, room_id, check_in_date, check_out_date, total_price, status, payment_status, created_at, updated_at } = req.body;

  try {
    const room = await Room.findById(room_id);
    if (!room || !room.availability) return res.status(400).json({ message: 'Room is not available' });

    const nights = Math.ceil((new Date(check_out_date) - new Date(check_in_date)) / (1000 * 60 * 60 * 24));
    const total_price = room.price * nights;

    const booking = new Booking({ user_id, room_id, check_in_date, check_out_date, total_price, status, payment_status, created_at, updated_at });
    await booking.save();

    room.availability = false;
    await room.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user_id').populate('room_id');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};