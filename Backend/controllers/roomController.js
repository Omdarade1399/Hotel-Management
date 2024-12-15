const Room = require('../models/roomModel');

exports.createRoom = async (req, res) => {
  const { room_type, room_number, availability, price, max_occupancy } = req.body;
  try {
    const roomExists = await Room.findOne({ room_number });
    if (roomExists) {
      return res.status(400).json({ message: 'Room number already exists' });
    }
    const room = new Room({ room_type, room_number, availability, price, max_occupancy });
    await room.save();
    res.status(201).json({ message: 'Room created successfully', room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room updated successfully', room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};