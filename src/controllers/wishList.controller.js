const { WishList, Trip } = require("../models");

/**
 * CREATE WISHLIST ITEM
 */
const createWishList = async (req, res, next) => {
  const { tripId, name, note } = req.body;

  try {
    // Ensure trip exists and belongs to logged-in user
    const trip = await Trip.findOne({
      where: {
        id: tripId,
        userId: req.user.id,
      },
    });

    if (!trip) {
      return res.status(400).json({ message: "Invalid Trip" });
    }

    const wishlist = await WishList.create({
      tripId,
      name,
      note,
    });

    res.status(201).json(wishlist);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL WISHLIST ITEMS (OF LOGGED-IN USER)
 */
const getAllWishList = async (req, res, next) => {
  try {
    const wishlist = await WishList.findAll({
      include: [
        {
          model: Trip,
          where: { userId: req.user.id },
          attributes: [],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!wishlist.length) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
};

/**
 * GET WISHLIST BY ID
 */
const getWishlistById = async (req, res, next) => {
  try {
    const wishlist = await WishList.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Trip,
          where: { userId: req.user.id },
          attributes: [],
        },
      ],
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE WISHLIST
 */
const updateWishlist = async (req, res, next) => {
  const { name, note } = req.body;

  try {
    const wishlist = await WishList.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Trip,
          where: { userId: req.user.id },
          attributes: [],
        },
      ],
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    await wishlist.update({ name, note });

    res.status(200).json({
      message: "Updated successfully",
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE WISHLIST
 */
const deleteWishlist = async (req, res, next) => {
  try {
    const wishlist = await WishList.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Trip,
          where: { userId: req.user.id },
          attributes: [],
        },
      ],
    });

    if (!wishlist) {
      return res.status(404).json({ message: "Not found" });
    }

    await wishlist.destroy();

    res.status(200).json({
      message: "Deleted successfully",
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.wishlistController = {
  createWishList,
  getAllWishList,
  getWishlistById,
  updateWishlist,
  deleteWishlist,
};