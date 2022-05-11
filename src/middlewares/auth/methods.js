const { Users, RoleActions, Actions } = require("../../common/database").models;

/**
 * @param  {int} id user Id
 * @return {Sequelize.models.Users}
 */
function findUserById(id) {
  return Users.findByPk(id, {
    attributes: ["id", "first_name", "last_name", "username", "roles"],
    raw: true,
  });
}

/**
 * @param  {String} username user Id
 * @return {Sequelize.models.Users}
 */
function findUserByUsername(username) {
  return Users.findOne({
    attributes: ["id", "first_name", "last_name", "username", "roles"],
    where: {
      username,
    },
    raw: true,
  });
}

/**
 * @param  {Sequelize.models.Users} user
 * @return {boolean} isAdmin
 */
async function isAdmin(user) {
  return Users.isAdmin(user);
}

/**
 * This function will be ran for almost every endpoint.
 * We should keep it as light as possible with the least request to the db as possible.
 * @param  {Sequelize.models.Users} user
 * @param  {String} uri
 * @param  {String} method
 * @return {boolean} whether any of the roles have permission
 */
async function hasRolePermission(user, uri, method) {
  if (isAdmin(user)) {
    return Promise.resolve(true);
  }

  const action = await RoleActions.findOne(
    {
      attributes: ["id"],
      where: {
        role_id: user.roles,
      },
    },
    {
      include: [
        {
          model: Actions,
          attributes: [],
          where: {
            uri: uri,
            method,
          },
          required: true,
        },
      ],
      raw: true,
    }
  );

  return !!action;
}

module.exports = {
  findUserById,
  findUserByUsername,
  hasRolePermission,
  isAdmin,
};
