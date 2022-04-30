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
 * @return {Promise} promise to fetch list of users
 */
function list(options) {
  const queryOptions = buildListOptions(options);
  return Users.findAll(queryOptions);
}

/**
 * @param  {int} id
 * @return {Promise} promise to fetch user by id
 */
function findById(id) {
  return Users.findByPk(id);
}

/**
 * @param  {int} id
 * @return {Promise} promise to destroy user by id
 */
async function destroy(id) {
  await Users.destroy({where:{id,}});
  return new Status(Status.OK);
}

module.exports = {
  destroy,
  findById,
  list,
};
