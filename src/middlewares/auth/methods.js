const { Users, RoleActions, Actions } = require("../../common/database").models;

/**
 * @param  {int} id user Id
 * @return {Sequelize.models.Users}
 */
function findUser(id) {
  return Users.findByPk(id, {
    attributes: ["id", "first_name", "last_name", "username", "roles"],
    raw: true,
    logging: console.log,
  });
}
/**
 * @param  {int[]} roles
 * @param  {String} uri
 * @param  {String} method
 * @return {boolean} whether any of the roles have permission
 */
async function hasRolePermission(roles, uri, method) {
  const action = await RoleActions.findOne(
    {
      attributes: ["id"],
      role_id: roles,
      action,
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
        },
      ],
      raw: true,
      logging: console.log,
    }
  );

  return !!action;
}

module.exports = {
  findUser,
  hasRolePermission,
};
