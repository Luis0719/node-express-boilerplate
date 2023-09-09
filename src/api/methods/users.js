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
 * @param  {Object} options
 * @return {Status}
 */
async function list(options) {
  const queryOptions = buildListOptions(options);
  const users = await Users.findAll(queryOptions);
  return new Status(Status.OK, users);
}

/**
 * @param  {Object} params
 * @return {Status}
 */
async function register(params) {
  const duplicatedUser = await Users.findOne({
    where: { [Op.or]: [{ username: params.email }, { email: params.email }] },
  });

  if (duplicatedUser) {
    return new Status(
      Status.BAD_REQUEST,
      `User with email ${params.email} already exists.`
    );
  }

  // In this particular case we want both username and email
  // to be the same. If we implement other types of logins (like social media login)
  // username will be different.
  params.username = params.email;
  const user = await Users.create(params);

  return new Status(Status.OK, user);
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
 * @param  {String} oldPassword
 * @param  {String} newPassword
 * @return {Status}
 */
async function setPassword(id, oldPassword, newPassword) {
  const user = await Users.findByPk(id);

  if (!user) {
    return new Status(Status.NOT_FOUND);
  }

  const passwordMatch = await user.passwordMatch(oldPassword);
  if (!passwordMatch) {
    return new Status(Status.BAD_REQUEST, "Old password does not match");
  }

  await user.setPassword(newPassword);
  await user.save();

  return new Status(Status.OK);
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
  register,
  setPassword,
};
