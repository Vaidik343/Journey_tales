module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    "Story",
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

      
      placeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      images: {
        type: DataTypes.JSON, // PostgreSQL array
        allowNull: true,
      },

      story: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      visitDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "stories",
      timestamps: true,
    }
  );

  return Story;
};