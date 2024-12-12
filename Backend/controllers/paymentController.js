const Payment = require('../models/paymentModel');
const Booking = require('../models/bookingModel');

// Create a Payment
exports.createPayment = async (req, res) => {
  const { booking_id, amount, payment_method, payment_reference, payment_status, payment_date, created_at, updated_at } = req.body;

  try {
    // Check if the booking exists
    const booking = await Booking.findById(booking_id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Create the payment
    const payment = new Payment({
      booking_id,
      user_id: req.user.id,
      amount,
      payment_method,
      payment_reference,
      payment_status: 'completed', 
      payment_date, 
      created_at, 
      updated_at
    });

    await payment.save();

    // Update the booking's payment status
    booking.payment_status = 'completed';
    await booking.save();

    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Payments (Admin Only)
exports.getAllPayments = async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Retrieve all payments
    const payments = await Payment.find()
      .populate('user_id', 'name email') 
      .populate('booking_id', 'check_in_date check_out_date'); 

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Payments for a Specific User
exports.getUserPayments = async (req, res) => {
  try {
    // Retrieve payments made by the logged-in user
    const payments = await Payment.find({ user_id: req.user.id })
      .populate('booking_id', 'room_id check_in_date check_out_date') 
      .populate('booking_id.room_id', 'room_type price'); 

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};