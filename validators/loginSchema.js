const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});
const userSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.empty": "Password is required.",
  }),
  role: Joi.string()
    .valid("admin", "staff", "logistics", "donor")
    .required()
    .messages({
      "any.only": "Role must be one of admin, staff, or logistics.",
      "string.empty": "Role is required.",
    }),
});
const staffOfficerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": `"username" should be a type of 'text'`,
    "string.empty": `"username" cannot be an empty field`,
    "string.min": `"username" should have a minimum length of {#limit}`,
    "any.required": `"username" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `"email" must be a valid email address`,
    "any.required": `"email" is a required field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),
  role: Joi.string().valid("admin", "staff", "user").required().messages({
    "any.only": `"role" must be one of ['admin', 'staff', 'user']`,
    "any.required": `"role" is a required field`,
  }),
});


module.exports = { loginSchema, userSchema, staffOfficerSchema };
