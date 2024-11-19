const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const config = require("../config");
const { loginSchema, userSchema } = require("../validators/loginSchema");

exports.register = async (userData) => {
  const { error } = userSchema.validate(userData, { abortEarly: false });

  if (error) {
    let errordetails = [];
    error.details.forEach((detail) => {
      errordetails.push({ field: detail.path[0], message: detail.message });
    });
    const validationError = new Error("Validation failed");
    validationError.details = errordetails;
    throw validationError;
  }

  const { username, email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword, role });
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

exports.login = async ({ email, password }) => {
  const { error } = loginSchema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));
    const validationError = new Error("Validation error");
    validationError.details = errors;
    throw validationError;
  }
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role,email: user.email},
    config.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

exports.refresh = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const newToken = jwt.sign(
    { userId: user._id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return newToken;
};

exports.getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
