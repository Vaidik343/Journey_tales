module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define(
    "Trip",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users", // table name
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "trips",
      timestamps: true,
    }
  );

  return Trip;
};