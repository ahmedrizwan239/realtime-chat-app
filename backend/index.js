const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/message.model");

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

// Socket.io for real-time chat
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join private chat room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("message", async ({ text }) => {
    const senderId = socket.id;  // Use socket.id as the senderId

    console.log(`Message from ${senderId}: ${text}`);

    // Broadcast the message to all connected clients
    io.emit("message", { senderId, text });
  });

  // Handle sending private messages
  socket.on("privateMessage", async ({ roomId, message, senderId, receiverId }) => {
    const newMessage = await Message.create({
      roomId,
      senderId,
      receiverId,
      text: message,
    });
    io.to(roomId).emit("privateMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
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


