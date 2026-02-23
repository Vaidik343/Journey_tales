module.exports = (sequelize, DataTypes) => {
  const BucketList = sequelize.define(
    "BucketList",
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

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "bucket_lists",
      timestamps: true,
    }
  );

  return BucketList;
};