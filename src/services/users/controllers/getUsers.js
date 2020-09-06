const { helpers } = require('common');
const { getUsers } = require('../methods');

const { buildSequelizeOptions } = helpers.sequelize;

module.exports = async (req, res) => {
  const options = buildSequelizeOptions(req.query);
  const users = await getUsers(options);

  res.send(users);
};
