"use strict";
const Sequelize = require("sequelize");
const config = require("./config");

let sequelize;
if (config.connection_url) {
  sequelize = new Sequelize(config.connection_url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = {
  models: require("./models"),
  connection: sequelize,
};
