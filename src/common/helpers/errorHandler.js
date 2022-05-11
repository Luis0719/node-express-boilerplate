const logger = require("../logger");

/**
 * @param  {Error} error
 */
function handle(error) {
  // Connect with Bugsnag, Sentry or any other service
  logger.error(error.stack);
  logger.error(error.message);
}

module.exports = {
  handle,
};
