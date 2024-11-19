const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message, details: error.details });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message ,details: error.details });
  }
};

exports.logout = (req, res) => {
  // Handle logout (invalidate JWT)
  res.status(200).send("Logged out");
};

exports.refresh = async (req, res) => {
  try {
    const newToken = await authService.refresh(req.body.refreshToken);
    res.json({ newToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await authService.getProfile(req.userId); // userId from token
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
