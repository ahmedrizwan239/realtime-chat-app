const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

// set up express
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Import and initialize socket handlers
require("./socket")(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

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