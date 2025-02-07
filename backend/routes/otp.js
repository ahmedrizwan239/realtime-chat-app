const router = require('express').Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Otp = require('../models/otp.model');

// Setup nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  try {
    // Generate OTP
    const otp = crypto.randomInt(1000, 9999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry
    
    // Save OTP to database
    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
    });
  }
});

// Validate OTP
router.post('/validate-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await Otp.findOne({ email, otp });
    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.',
      });
    }

    // OTP is valid
    await Otp.deleteOne({ email, otp }); 
    res.status(200).json({
      success: true,
      message: 'OTP validated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to validate OTP',
    });
  }
});

module.exports = router;