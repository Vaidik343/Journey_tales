const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Import model factories
const UserModel = require("./users.model");
const TripModel = require("./trip.model");
const StoryModel = require("./stories.model");
const WishListModel = require("./wishList.model");
const BucketListModel = require("./bucketList.model");

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Trip = TripModel(sequelize, DataTypes);
const Story = StoryModel(sequelize, DataTypes);
const WishList = WishListModel(sequelize, DataTypes);
const BucketList = BucketListModel(sequelize, DataTypes);

// =====================
// Associations
// =====================

// User → Trip
User.hasMany(Trip, { foreignKey: "userId", onDelete: "CASCADE" });
Trip.belongsTo(User, { foreignKey: "userId" });

// Trip → Story
Trip.hasMany(Story, { foreignKey: "tripId", onDelete: "CASCADE" });
Story.belongsTo(Trip, { foreignKey: "tripId" });

// Trip → WishList
Trip.hasMany(WishList, { foreignKey: "tripId", onDelete: "CASCADE" });
WishList.belongsTo(Trip, { foreignKey: "tripId" });

// Trip → BucketList
Trip.hasMany(BucketList, { foreignKey: "tripId", onDelete: "CASCADE" });
BucketList.belongsTo(Trip, { foreignKey: "tripId" });

module.exports = {
  sequelize,
  User,
  Trip,
  Story,
  WishList,
  BucketList,
};