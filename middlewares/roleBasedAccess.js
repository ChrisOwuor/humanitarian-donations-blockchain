const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config");

const roleBasedAccess = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, config.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

module.exports = roleBasedAccess;
