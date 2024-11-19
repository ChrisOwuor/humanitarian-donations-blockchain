const express = require("express");
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const roleBasedAccess = require("../middlewares/roleBasedAccess");

const router = express.Router();

// Authentication routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/refresh", authController.refresh);
router.get(
  "/auth/me",
  roleBasedAccess(["admin", "staff", "logistics", "donor"]),
  authController.getProfile
);

// Admin routes (accessible only by admins)

router.post(
  "/admin/create-staff-officer",
  roleBasedAccess(["admin"]),
  adminController.createOfficer
);

module.exports = router;
