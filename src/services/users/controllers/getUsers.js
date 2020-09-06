const { helpers } = require('common');
const { buildSequelizeOptions } = helpers.sequelize;

const { getUsers } = require('../methods');

module.exports = async (req, res) => {
  const options = buildSequelizeOptions(req.query);
  const users = await getUsers(options);

  return res.send(users);
};
