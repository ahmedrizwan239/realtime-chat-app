const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('otp', otpSchema);
