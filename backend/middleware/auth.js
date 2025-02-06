const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization"); // Get the Authorization header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No authentication token, access denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({ msg: "Token verification failed, authorization denied" });
    }

    req.user = verified.id; // Attach user ID to request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;