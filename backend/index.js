const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const Message = require("./models/message.model");
const User = require("./models/user.model");

// set up express
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",  
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token; // Get token from frontend
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    console.log(user);
    
    if (!user) {
      return next(new Error("Authentication error: User not found"));
    }

    // Attach user info to the socket
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

// Socket.io for real-time chat
// Socket.io connection handler
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.name} (${socket.user.id})`);

  // Join private chat room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.user.id} joined room: ${roomId}`);
  });

  // Handle public messages
  socket.on("message", async ({ text }) => {
    console.log(`Message from ${socket.user.id}: ${text}`);

    io.emit("message", { senderId: socket.user.id, text });
  });

  // Handle private messages
  socket.on("privateMessage", async ({ roomId, message, receiverId }) => {
    const newMessage = await Message.create({
      roomId,
      senderId: socket.user.id,  // Actual MongoDB user ID
      receiverId,
      text: message,
    });

    io.to(roomId).emit("privateMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.id}`);
  });
});

// set up mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes
app.use("/otp", require("./routes/otp"));
app.use("/users", require("./routes/users"));
app.use("/todos", require("./routes/todo"));
app.use("/chat", require("./routes/chat"));