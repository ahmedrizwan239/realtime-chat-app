const router = require("express").Router();
const auth = require("../middleware/auth"); 
const Message = require("../models/message.model"); 
const mongoose = require("mongoose");
const { sendMessage } = require('../controllers/chatController');

// Create or find chat room between two users
router.post("/room", async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ error: "Sender and receiver IDs are required." });
  }

  try {
    // Create unique roomId by combining user IDs
    const roomId = [senderId, receiverId].sort().join("_");
    // const roomId = 12345;
    return res.status(200).json({ roomId });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create or find chat room." });
  }
});

// POST /chat/room/:roomId/message (Send message to a room)
router.post('/room/:roomId/message', sendMessage);

// Fetch message history for a specific room
router.get("/room/:roomId/messages", async (req, res) => {
  const { roomId } = req.params;

  if (!roomId) {
    return res.status(400).json({ error: "Room ID is required." });
  }

  try {
    const messages = await Message.find({ roomId }).sort("timestamp");
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch messages." });
  }
});

router.get("/messages/:senderId/:receiverId", async (req, res) => {
    const { senderId, receiverId } = req.params;
  
    if (!senderId || !receiverId) {
      return res.status(400).json({ error: "Sender and receiver IDs are required." });
    }
  
    try {
      const messages = await Message.find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId }
        ]
      }).sort("timestamp");
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch messages." });
    }
  });

module.exports = router;
