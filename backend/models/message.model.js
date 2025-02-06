const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  receiverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  read: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Create index for efficient querying
messageSchema.index({ senderId: 1, receiverId: 1 });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;