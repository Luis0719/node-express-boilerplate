const requireDirectory = require("require-directory");

/**
 * Runs associate() for each model. Used to define db relationships
 * @param  {Sequelize.Model} model
 */
function visitor(model) {
  if (model.associate) {
    model.associate(db);
  }
}

module.exports = requireDirectory(module, { visit: visitor });
