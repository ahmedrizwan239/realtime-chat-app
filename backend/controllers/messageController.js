const Message = require('../models/message.model');

const getMessages = async (req, res) => {
    const { userId } = req.params;
    const authUserId = req.user;

    try {
        // Ensure the user is trying to fetch messages with another user (not themselves)
        if (authUserId.toString() === userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot fetch messages with yourself.",
            });
        }

        // Fetch messages where either the sender or receiver matches the authenticated user or the target user
        const messages = await Message.find({
            $or: [
                { senderId: authUserId, receiverId: userId },
                { senderId: userId, receiverId: authUserId },
            ]
        })
            .sort({ createdAt: -1 }) // Latest messages first
            .select('-__v');

        res.json({
            success: true,
            message: 'Messages retrieved successfully.',
            data: messages,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
        });
    }
};

module.exports = { getMessages };