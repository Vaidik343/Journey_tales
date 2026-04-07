const { Story, Trip } = require("../models");
const { fileUpload, deleteFromCloudinary } = require("../utils/fileUpload");

/**
 * CREATE STORY
 */
const createStories = async (req, res, next) => {
  const { tripId, placeName, story, visitDate } = req.body;
  // console.log("🚀 ~ createStories ~  tripId, placeName, story, visitDate :",  req.body )

  const parsedVisitDate = visitDate ? new Date(visitDate) : null;
  try {
    // Ensure trip exists and belongs to logged-in user
    const trip = await Trip.findOne({
      where: {
        id: tripId,
         userId: req.user.id,
       
      },
    });
    console.log("🚀 ~ createStories ~ trip:", trip)

    if (!trip) {
      return res.status(400).json({ message: "Invalid Trip" });
    }

    // Check duplicate place inside same trip
    const exists = await Story.findOne({
      where: { tripId, placeName },
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "Place already exists in this trip!" });
    }

    // Upload images
    let imageUrls = [];
    // console.log("🚀 ~ createStories ~ imageUrls:", imageUrls)
    
if (req.files && req.files.length > 0) {
  try {
    for (const file of req.files) {
      const result = await fileUpload(file.path);

      if (!result) {
        throw new Error("Upload failed");
      }

      imageUrls.push(result); // track successful uploads
    }
  } catch (error) {
    // ✅ cleanup already uploaded images
    await Promise.allSettled(
      imageUrls.map((img) =>
        deleteFromCloudinary(img.public_id)
      )
    );

    return res.status(500).json({
      message: "Image upload failed. Story not created.",
    });
  }
}

    const newStory = await Story.create({
      tripId,
      placeName,
      images: imageUrls,
      story,
      visitDate:parsedVisitDate,
    });
    console.log("🚀 ~ createStories ~ newStory:", newStory)

    res.status(201).json(newStory);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL STORIES (OF LOGGED-IN USER)
 */
const getAllStories = async (req, res, next) => {
  try {
    // Make sure user exists
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const stories = await Story.findAll({
      include: [
        {
          model: Trip,
          where: { userId }, // ✅ only trips belonging to logged-in user
          attributes: [],   // exclude Trip fields
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!stories.length) {
      return res.status(404).json({ message: "Not found!" });
    }

    res.status(200).json(stories);
  } catch (error) {
    next(error);
  }
};
console.log("🚀 ~ getAllStories ~ getAllStories:", getAllStories)

/**
 * GET STORY BY ID
 */
const getStoryById = async (req, res, next) => {
  try {
     const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const story = await Story.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Trip,
         where: { userId },
          attributes: [],
        },
      ],
    });

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.status(200).json(story);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE STORY
 */
const updateStories = async (req, res, next) => {
  const { placeName, story, visitDate } = req.body;
const userId = req.user?.id;
  try {
    const storyRecord = await Story.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Trip,
     where: { userId},
          attributes: [],
        },
      ],
    });

    if (!storyRecord) {
      return res.status(404).json({ message: "Story not found" });
    }

    await storyRecord.update({
      placeName,
      story,
      visitDate,
    });

    res.status(200).json({
      message: "Updated successfully",
      updated: storyRecord,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE STORY
 */
const deleteStories = async (req, res, next) => {

  try {
    const story = await Story.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Trip,
          where: { userId: req.user.id },
          attributes: [],
        },
      ],
    });

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
     
    if(story.images && story.images.length > 0) {
      await Promise.allSettled(
  story.images.map((img) =>
    deleteFromCloudinary(img.public_id)
  )
);
    }

    console.log("🚀 images:", story.images);
     
    //delete from DB
    await story.destroy();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports.storyController = {
  createStories,
  getAllStories,
  getStoryById,
  updateStories,
  deleteStories,
};