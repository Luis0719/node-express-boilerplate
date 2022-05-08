const { models } = require("../../../src/common/database");

/**
 * Removes all records stored in the database.
 * @param  {Sequelize.Model} [model] model to clean.
 * @return {Promise} promise to clean the desired table(s)
 */
function cleanDatabase(model) {
  // TODO Clean all models if model is not provided
  if (model) {
    return model.destroy({
      truncate: true,
      force: true,
      cascade: true,
    });
  }

  const promises = Object.values(models).map((model) =>
    model.destroy({
      truncate: true,
      force: true,
      cascade: true,
    })
  );
  return Promise.all(promises);
}

module.exports = {
  cleanDatabase,
};
