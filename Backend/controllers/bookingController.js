const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

exports.createBooking = async (req, res) => {
  const { customer_name, room_number, check_in_date, check_out_date, status, payment_status } = req.body;

  try {
    const room = await Room.findOne({ room_number });
    if (!room || !room.availability) return res.status(400).json({ message: 'Room is not available' });

    const conflictingBooking = await Booking.findOne({
      room_number,
      $or: [
        { check_in_date: { $lt: new Date(check_out_date) }, check_out_date: { $gt: new Date(check_in_date) } }
      ]
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Room is already booked for the selected dates.' });
    }

    const nights = Math.ceil((new Date(check_out_date) - new Date(check_in_date)) / (1000 * 60 * 60 * 24));
    const total_price = room.price * nights;

    const booking = new Booking({
      customer_name,
      room_number,
      check_in_date,
      check_out_date,
      total_price,
      status: status || 'booked', 
      payment_status: payment_status || 'pending',
    });
    await booking.save();

    room.availability = false; 
    await room.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const room = await Room.findOne({ room_number: booking.room_number });
    if (room) {
      room.availability = true; 
      await room.save();
    }

    await booking.deleteOne();

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
