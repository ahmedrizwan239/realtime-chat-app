const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization"); // Get the Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No authentication token, access denied",
      });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, access denied",
      });
    }

    req.user = verified.id;
    next(); 
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = auth;
