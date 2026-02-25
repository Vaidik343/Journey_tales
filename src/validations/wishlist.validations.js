const {body, param} = require('express-validator');

const createWishListValidations = [
    body('tripId').notEmpty().withMessage("Trip Id required!")
   .withMessage("Invalid Id"),

    body('name').notEmpty().withMessage("Name required!")
    .isLength({min:3}).withMessage("Name must be at least 3 character!")
    .isLength({ max: 100 }).withMessage("name cannot exceed 100 characters"),

    body('note').optional().isLength({max:300}).withMessage("note must be max 300 character!")
]

const updateWishListValidations = [
     param("id")
    .isUUID()
    .withMessage("Invalid user ID"),

    
    body('name').optional()
    .isLength({min:3}).withMessage("Name must be at least 3 character!"),

    body('note').optional().isLength({max:100}).withMessage("note must be max 100 character!")

    
]

const deleteWishListValidations = [
      param("id")
  .isUUID()
    .withMessage("Invalid user ID"),  param('id')

]

module.exports.wishlistValidations = {createWishListValidations, updateWishListValidations, deleteWishListValidations}