module.exports = (sequelize, DataTypes) => {
  const WishList = sequelize.define(
    "WishList",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      tripId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "trips",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "wishlists",
      timestamps: true,
    }
  );

  return WishList;
};