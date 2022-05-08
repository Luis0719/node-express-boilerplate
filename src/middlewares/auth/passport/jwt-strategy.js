const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("../../../common/helpers/jwt");
const methods = require("../methods");
const logger = require("../../../common/logger");

/**
 * @param  {Object} data jwt decoded
 * @return {boolean}
 */
function hasJwtExpired(data) {
  return false;
}

const strategy = new BearerStrategy(function (token, done) {
  // Passport strategy do not support async callbacks
  jwt
    .verify(token)
    .then((decoded) => {
      if (hasJwtExpired(decoded)) {
        return done(null, false);
      }
      const userData = decoded.data;

      methods
        .findUser(userData.id)
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        })
        .catch((err) => {
          logger.error(err.message);
          logger.error(err.stack);
          return done(err, null);
        });
    })
    .catch((err) => {
      logger.error(err.message);
      logger.error(err.stack);
      return done(err, false);
    });
});

module.exports = strategy;
