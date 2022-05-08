const logger = require("../logger");

/**
 * @param  {Promise} promise
 * @return {[err, any]} result
 */
async function to(promise) {
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    return [err, null];
  }
}
/**
 * Similar as to(promise), but used for request and
 * propagating errors. Express does not handle errors
 * on async handlers. We need to pass them to next()
 * @param  {Express.Handler} handler
 * @return {Express.Response}
 */
function requestTo(handler) {
  return async function (req, res, next) {
    try {
      const result = await handler(req, res, next);
      return result;
    } catch (err) {
      logger.error(err.message);
      logger.error(err.stack);
      return next(err);
    }
  };
}

module.exports = {
  to,
  requestTo,
};
