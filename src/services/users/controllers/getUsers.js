const { helpers } = require('common');
const { getUsers } = require('../methods');

const { to } = helpers.functionalHelpers;
const { buildSequelizeOptions } = helpers.sequelize;

module.exports = async (req, res) => {
  const { query, logger } = req;

  const options = buildSequelizeOptions(query);
  const [error, users] = await to(getUsers(options));

  if (error) {
    logger.error(error);
    return res.boom.internal();
  }

  res.send(users);
};
