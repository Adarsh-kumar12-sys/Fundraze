const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  // ✅ Allow OPTIONS requests to pass through without authentication.
  // CORS preflight requests use the OPTIONS method and do not carry authentication headers.
  // The 'cors' middleware handles setting the appropriate CORS headers for OPTIONS requests.
  if (req.method === 'OPTIONS') {
    return next();
  }

  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the decoded token and attach to request object
      // Exclude the password field for security
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to the next middleware/route handler
      next();
    } catch (err) {
      // If token verification fails (e.g., invalid token, expired token)
      
      return res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }

  // If no token is found in the authorization header
  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }
};

module.exports = protect;
