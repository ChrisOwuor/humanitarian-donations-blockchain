const User = require("../models/user");
const { staffOfficerSchema } = require("../validators/loginSchema");
const bcrypt = require("bcrypt");


exports.createOfficers = async ({ username, email, password, role }) => {
  const { error } = staffOfficerSchema.validate(
    { username, email, password, role },
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
  const hashedPassword = await bcrypt.hash(password, 10);
  const staffOfficer = new User({
    username,
    email,
    password: hashedPassword,
    role,
  });

  await staffOfficer.save();
  const createdStaffOfficer = staffOfficer.toObject();
  delete createdStaffOfficer.password;
  return createdStaffOfficer;
};
