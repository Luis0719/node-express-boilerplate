"use strict";
const Sequelize = require("sequelize");
const config = require("./config");
const requireDirectory = require("require-directory");

let connection;
if (config.connection_url) {
  connection = new Sequelize(config.connection_url, config);
} else {
  connection = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// try {
//   connection.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

/**
 * Runs associate() for each model. Used to define db relationships
 * @param  {Sequelize.Model.Define} model
 * @return {Sequelize.Model} initialized model
 */
function modelVisitor(model) {
  return model(connection);
}

const models = requireDirectory(module, "./models", { visit: modelVisitor });

for (const [, model] of Object.entries(models)) {
  if (model.associate) {
    model.associate(models);
  }
}

module.exports = {
  models,
  connection,
};
