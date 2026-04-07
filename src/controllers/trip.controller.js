
const { Trip } = require("../models");
const { fileUpload } = require("../utils/fileUpload");

/**
 * CREATE TRIP
 */
const createTrip = async (req, res, next) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { title, startDate, endDate, summary } = req.body;
    const userId = req.user?.id;
  console.log("🚀 ~ createTrip ~ userId:", userId)

  try {
    // check duplicate title for same user
    const exists = await Trip.findOne({
      where: { title, userId },
    });

    if (exists) {
      return res.status(400).json({ message: "Title already exists" });
    }

    let coverImageUrl = null;

    if (req.file) {
      coverImageUrl = await fileUpload(req.file.path);
      console.log("🚀 ~ createTrip ~ coverImageUrl:", coverImageUrl);
    }

    const trip = await Trip.create({
      userId,
      title,
      coverImage: coverImageUrl,
      startDate,
      endDate,
      summary,
    });

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL TRIPS (OF LOGGED-IN USER)
 */
const getAllTrip = async (req, res, next) => {
  try {

    const userId = req.user?.id;
if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const trips = await Trip.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    console.log("🚀 ~ getAllTrip ~ trips:", trips)

    if (!trips.length) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
};
console.log("🚀 ~ getAllTrip ~ getAllTrip:", getAllTrip)

/**
 * GET TRIP BY ID
 */
const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id, // ownership check
      },
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE TRIP
 */
const updateTrip = async (req, res, next) => {
  const { title, startDate, endDate, summary } = req.body || {} ;
  const tripId = req.params.id
  try {
    const trip = await Trip.findOne({
      where: {
        id: tripId,
        userId: req.user.id,
      },
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    let coverImageUrl = null;
    if (req.file) {
      coverImageUrl = await fileUpload(req.file.path);
    }

    await trip.update({
      title,
      startDate,
      endDate,
      summary,
      ...(coverImageUrl && { coverImage: coverImageUrl }),
    });

    res.status(200).json({
      message: "Updated successfully",
      updatedTrip: trip,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE TRIP
 */
const deleteTrip = async (req, res, next) => {
  const tripId = req.params.id
  try {
    
  const deleteTrip =  await Trip.destroy({
    where: {id : tripId,
      userId: req.user.id,
    }
  });

    if(!deleteTrip)
    {
      return res.status(404).json("Not found")
    }
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    next(error);
  }
};
console.log("🚀 ~ deleteTrip ~ deleteTrip:", deleteTrip)


module.exports.tripController = {
  createTrip,
  getAllTrip,
  getTripById,
  updateTrip,
  deleteTrip,
};