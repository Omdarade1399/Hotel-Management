const Payment = require('../models/paymentModel');
const Booking = require('../models/bookingModel');

exports.createPayment = async (req, res) => {
  const { customer_name, room_number, amount, payment_method } = req.body;

  try {
    const booking = await Booking.findOne({ customer_name, room_number });
    if (!booking) return res.status(404).json({ message: 'Invalid booking details' });

    const payment = new Payment({
      booking_id: booking._id,
      amount,
      payment_method,
      payment_status: 'completed',
      payment_date: new Date(),
    });

    await payment.save();

    booking.payment_status = 'completed';
    await booking.save();

    res.status(201).json({ message: 'Payment successful', payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('booking_id', 'customer_name room_number total_price check_in_date check_out_date');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
