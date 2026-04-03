require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";

const databaseUrl =
  env === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions:
    env !== "test"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      : {},
  logging: false
});
module.exports = { sequelize };