const { helpers } = require('common');
const { storeUser } = require('../methods');

const { InternalError } = helpers.httpErrors;
const { to } = helpers.functionalHelpers;

module.exports = async (req, res) => {
  const { payload } = res;

  const [error, result] = await to(storeUser(payload));

  if (error) {
    throw InternalError(error);
  }

  res.send(result);
};
