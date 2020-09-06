const { helpers } = require('common');
const { storeUser } = require('../methods');

const { to } = helpers.functionalHelpers;

module.exports = async (req, res) => {
  const { body, logger } = req;

  logger.info('Trying to store user');
  logger.info(body);
  const [error, result] = await to(storeUser(body));

  if (error) {
    logger.error(error);
    return res.boom.internal();
  }

  res.send(result);
};
