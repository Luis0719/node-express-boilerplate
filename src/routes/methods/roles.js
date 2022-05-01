const { Roles, RoleActions } = require("../../common/database").models;
const Status = require("../../common/helpers/status");
// const { Op } = require("sequelize");

/**
 * @param  {Object} params
 * @return {Status}
 */
async function store(params) {
  const role = await Roles.create(params);

  const roleActions = params.actions.map((action) => ({
    role_id: role.id,
    action_id: action,
  }));

  await RoleActions.bulkCreate(roleActions);

  return new Status(Status.OK, role);
}

module.exports = { store };
