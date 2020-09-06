const { helpers } = require('common');
const { getUser } = require('../methods');

const { to } = helpers.functionalHelpers;

module.exports = async (req, res) => {
  const { params, logger } = req;

  const [error, user] = await to(getUser(params.id));

  if (error) {
    logger.error(error);
    return res.boom.internal();
  }

  if (!user) {
    return res.boom.notFound(`User with id ${req.params.id} does not exists`);
  }

  res.send(user);
};
