const jwt = require("jsonwebtoken");
const Message = require("./models/message.model");
const User = require("./models/user.model");

module.exports = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return next(new Error("Authentication error: User not found"));
      }

      // Attach user info to socket
      socket.user = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      console.log(`User authenticated: ${user.name} (${user._id})`);
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  // Store connected users (socket.id mapped to user.id)
  const users = new Map(); 

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.name} (${socket.user.id})`);
    
    // Store user ID with socket ID
    users.set(socket.user.id.toString(), socket.id);

    socket.on("privateMessage", async ({ receiverId, message }) => {
      try {
        const newMessage = await Message.create({
          senderId: socket.user.id,
          receiverId,
          text: message,
        });

        const receiverSocketId = users.get(receiverId);
        
        // Send message to receiver if online
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("privateMessage", newMessage);
        }

        console.log(`Message sent from ${socket.user.id} to ${receiverId}`);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.id}`);
      users.delete(socket.user.id.toString());
    });
  });
};