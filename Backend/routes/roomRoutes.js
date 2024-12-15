const express = require('express');
const { createRoom, getRooms, updateRoom, deleteRoom } = require('../controllers/roomController');
const router = express.Router();

router.post('/createRoom', createRoom);
router.get('/getRooms', getRooms);
router.put('/updateRoom/:id', updateRoom);
router.delete('/deleteRoom/:id', deleteRoom);

module.exports = router;