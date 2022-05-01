const _ = require("lodash");

/**
 * @param  {Sequelize.Model.Users} user
 * @return {Oject} user with selected fields only
 */
function basicRole(user) {
  const data = _.pick(user, ["id", "name", "createdAt"]);

  return data;
}

/**
 * @param  {Sequelize.Model.Users} user
 * @return {Oject} user with selected fields only
 */
function detailedRole(user) {
  const data = _.pick(user, ["id", "name", "createdAt", "updatedAt"]);

  return data;
}

module.exports = {
  basicRole,
  detailedRole,
};
