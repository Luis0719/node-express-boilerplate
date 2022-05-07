const { Roles, RoleActions } = require("../../common/database").models;
const sequelizeUtils = require("../../common/helpers/sequelizeUtils");
const { to } = require("../../common/helpers/asyncUtils");
const Status = require("../../common/helpers/status");
const { Op } = require("sequelize");
const _ = require("lodash");

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
  const [errorRole, role] = await to(Roles.create(params));
  if (errorRole) {
    return sequelizeUtils.toStatusError(errorRole);
  }

  const roleActions = params.actions.map((action) => ({
    role_id: role.id,
    action_id: action,
  }));

  const [errorRoleActions] = await to(RoleActions.bulkCreate(roleActions));
  if (errorRoleActions) {
    return sequelizeUtils.toStatusError(errorRoleActions);
  }

  return new Status(Status.OK, role);
}

/**
 * @param  {int} id role id
 * @param  {Object} params
 * @return {Status}
 */
async function update(id, params) {
  const role = await Roles.findByPk(id);

  if (!role) {
    return new Status(Status.NOT_FOUND);
  }

  role.name = params.name;
  await role.save();

  // Get current role actions and compare with updated list.
  // All missing items will be deleted and all new items will be
  // created
  const currentRoleActions = await RoleActions.findAll({
    attributes: ["action_id"],
    where: { role_id: role.id },
    raw: true,
  });
  const currentRoleActionIds = _.map(currentRoleActions, "action_id");

  const actionsToDelete = _.difference(currentRoleActionIds, params.actions);
  if (actionsToDelete.length > 0) {
    await RoleActions.destroy({
      where: {
        role_id: role.id,
        action_id: actionsToDelete,
      },
    });
  }

  const actionsToCreate = _.difference(params.actions, currentRoleActionIds);
  if (actionsToCreate.length > 0) {
    const newRoleActions = actionsToCreate.map((action) => ({
      role_id: role.id,
      action_id: action,
    }));
    await RoleActions.bulkCreate(newRoleActions);
  }

  return new Status(Status.OK, role);
}

module.exports = { store, list, update };
