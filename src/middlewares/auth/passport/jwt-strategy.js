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

/**
 * @param  {String} token
 * @return {Sequelize.models.User}
 */
async function verify(token) {
  const decoded = await jwt.verify(token);

  if (hasJwtExpired(decoded)) {
    return null;
  }

  const userData = decoded.data;
  return methods.findUserById(userData.id);
}

const strategy = new BearerStrategy(function (token, done) {
  verify(token)
    .then((user) => {
      if (!user) return done(null, false);

      return done(null, user);
    })
    .catch((err) => {
      logger.error(err.message);
      logger.error(err.stack);
      console.log(err);
      return done(err, false);
    });
});

module.exports = { strategy, verify };
