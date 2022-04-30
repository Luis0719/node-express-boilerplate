const _ = require("lodash");

/**
 * @param  {Sequelize.Model.Users} user
 * @return {Oject} user with selected fields only
 */
function basicUser(user) {
  const data = _.pick(user, [
    "id",
    "first_name",
    "last_name",
    "full_name",
    "email",
    "createdAt",
  ]);

  return data;
}

/**
 * @param  {Sequelize.Model.Users} user
 * @return {Oject} user with selected fields only
 */
function profileUser(user) {
  const data = _.pick(user, [
    "id",
    "first_name",
    "last_name",
    "full_name",
    "image",
    "username",
    "roles",
    "email",
    "phone",
    "createdAt",
    "updatedAt",
  ]);

  return data;
}

module.exports = {
  basicUser,
  profileUser,
};
