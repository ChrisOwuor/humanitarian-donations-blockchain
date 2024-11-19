const adminService = require("../services/adminService");
exports.createOfficer = async (req, res) => {
  try {
    const staff = await adminService.createOfficers(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ message: error.message,details: error.details });
  }
};
