module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true, // matches mongoose { timestamps: true }
      indexes: [
        {
          fields: ["name"], // equivalent to index: true in mongoose
        },
      ],
    }
  );

  return User;
};