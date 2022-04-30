const Status = require("../../common/helpers/status");
const { Users } = require("../../common/database").models;
const { Op } = require("sequelize");
/**
 * @param  {Object} options
 * @return {Object} query options
 */
function buildListOptions(options) {
  const where = {};
  if (options.name) {
    where[Op.or] = [
      {
        first_name: {
          [Op.like]: `%${options.name}%`,
        },
      },
      {
        last_name: {
          [Op.like]: `%${options.name}%`,
        },
      },
    ];
  }

  return {
    where,
  };
}

/**
 * @param  {Object} options list of options
 * @return {Status}
 */
async function list(options) {
  const queryOptions = buildListOptions(options);
  const users = await Users.findAll(queryOptions);
  return new Status(Status.OK, users);
}

/**
 * @param  {int} id
 * @return {Status}
 */
async function findById(id) {
  const user = await Users.findByPk(id);

  if (!user) {
    return new Status(Status.NOT_FOUND);
  }

  return new Status(Status.OK, user);
}

/**
 * @param  {int} id
 * @return {Status}
 */
async function destroy(id) {
  await Users.destroy({ where: { id } });
  return new Status(Status.OK);
}

module.exports = {
  destroy,
  findById,
  list,
};
