const { body, param } = require("express-validator");

const createUserValidation = [
  body("name").notEmpty().withMessage("Name required!"),
  body("email").isEmail().withMessage("Valid email required!"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const updateUserValidation = [
  param("id")
    .isUUID()
    .withMessage("Invalid user ID"),
  body("name").optional().notEmpty(),
  body("email").optional().isEmail().withMessage("Valid email required!"),
];

const deleteUserValidation = [
  param("id")
    .isUUID()
    .withMessage("Invalid user ID"),
];

module.exports.usersValidation = {
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
};