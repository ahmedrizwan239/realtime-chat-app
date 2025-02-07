const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.provider !== "credentials") {
      return res.status(400).json({
        success: false,
        message: "Please use another method to sign in!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      success: true,
      message: "Login successful.",
      data: { user:userWithoutPassword, token },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
});

// Delete user
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
});

// Get user details
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      message: "User details retrieved successfully.",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
});

// Get all users
router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password"); 

    res.json({
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
});

module.exports = router;
