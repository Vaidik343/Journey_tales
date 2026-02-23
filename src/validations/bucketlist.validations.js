const { body, param } = require("express-validator");

const createBucketListValidations = [
  body("tripId")
    .notEmpty().withMessage("Trip Id required!")
   .isInt()
    .withMessage("Invalid user ID"),
   

  body("name")
    .notEmpty().withMessage("Name required!")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters!")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("quantity")
    .optional()
    .isInt({ min: 1 }).withMessage("Quantity must be a positive number!"),

  body("note")
    .optional()
    .isLength({ max: 300 }).withMessage("Note must be max 300 characters"),
];

const updateBucketListValidations = [
   param("id")
    .isInt()
    .withMessage("Invalid user ID"),
  body("name")
    .optional()
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters!")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("quantity")
    .optional()
    .isInt({ min: 1 }).withMessage("Quantity must be a positive number!"),

  body("note")
    .optional()
    .isLength({ max: 300 }).withMessage("Note must be max 300 characters"),
];

const deleteBucketListValidations = [
   param("id")
    .isInt()
    .withMessage("Invalid user ID"),
];

module.exports.bucketlistValidations = {
  createBucketListValidations,
  updateBucketListValidations,
  deleteBucketListValidations,
};
