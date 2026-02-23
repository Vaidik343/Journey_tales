const { BucketList, Trip } = require("../models");

/**
 * CREATE BUCKET LIST ITEM
 */
const createBucketList = async (req, res, next) => {
  const { tripId, name, quantity, note } = req.body;

  try {
    // Ensure trip exists & belongs to logged-in user
    const trip = await Trip.findOne({
      where: {
        id: tripId,
        userId: req.user.id,
      },
    });

    if (!trip) {
      return res.status(400).json({ message: "Invalid Trip" });
    }

    const bucketList = await BucketList.create({
      tripId,
      name,
      quantity,
      note,
    });

    res.status(201).json(bucketList);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL BUCKET LIST ITEMS (LOGGED-IN USER)
 */
const getAllBucketList = async (req, res, next) => {
  try {
    const bucketList = await BucketList.findAll({
      include: [
        {
          model: Trip,
          where: { userId: req.user.id },
          attributes: [],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!bucketList.length) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(bucketList);
  } catch (error) {
    next(error);
  }
};

/**
 * GET BUCKET LIST BY ID
 */
const getBucketById = async (req, res, next) => {
  try {
    const bucketList = await BucketList.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Trip,
          where: { userId: req.user.id },
          attributes: [],
        },
      ],
    });

    if (!bucketList) {
      return res.status(404).json({ message: "Bucket not found" });
    }

    res.status(200).json(bucketList);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE BUCKET LIST
 */
const updateBucketList = async (req, res, next) => {
  const { name, quantity, note } = req.body;

  try {
    const bucketList = await BucketList.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Trip,
          where: { userId: req.user.id },
          attributes: [],
        },
      ],
    });

    if (!bucketList) {
      return res.status(404).json({ message: "Bucket not found" });
    }

    await bucketList.update({ name, quantity, note });

    res.status(200).json({
      message: "Updated successfully",
      bucketList,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE BUCKET LIST
 */
const deleteBucketList = async (req, res, next) => {
  try {
    const bucketList = await BucketList.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Trip,
          where: { userId: req.user.id },
          attributes: [],
        },
      ],
    });

    if (!bucketList) {
      return res.status(404).json({ message: "Not found" });
    }

    await bucketList.destroy();

    res.status(200).json({
      message: "Deleted successfully",
      bucketList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.bucketListController = {
  createBucketList,
  getAllBucketList,
  getBucketById,
  updateBucketList,
  deleteBucketList,
};