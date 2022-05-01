const { Roles, RoleActions } = require("../../common/database").models;
const Status = require("../../common/helpers/status");
const { Op } = require("sequelize");

/**
 * @param  {Object} options
 * @return {Object} query options
 */
function buildListOptions(options) {
  const where = {};
  if (options.name) {
    where.name = {
      [Op.like]: `%${options.name}%`,
    };
  }

  return {
    where,
  };
}

/**
 * @param  {Object} options
 */
async function list(options) {
  const queryOptions = buildListOptions(options);
  const roles = await Roles.findAll(queryOptions);

  return new Status(Status.OK, roles);
}

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

module.exports = { store, list };
