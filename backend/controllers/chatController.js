const Message = require('../models/message.model');

// Send message between users
const sendMessage = async (req, res) => {
  const { roomId } = req.params;
  const { senderId, receiverId, text } = req.body;

  if (!senderId || !receiverId || !text) {
    return res.status(400).json({ error: 'Sender, receiver, and message text are required' });
  }

  try {
    const message = new Message({
    //   roomId,
      senderId,
      receiverId,
      text,
    });

    await message.save();
    res.status(200).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = { sendMessage };
