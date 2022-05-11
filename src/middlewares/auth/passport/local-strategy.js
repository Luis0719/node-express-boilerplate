const LocalStrategy = require("passport-local");
const methods = require("../methods");
const logger = require("../../../common/logger");

/**
 * @param  {String} username
 * @param  {String} password
 * @return {Sequelize.models.User}
 */
async function verify(username, password) {
  const user = await methods.findUserByUsername(username);

  if (!user) {
    return null;
  }

  const passwordMatches = user.passwordMatch(password);
  if (!passwordMatches) {
    return null;
  }

  return user;
}

const strategy = new LocalStrategy((username, password, done) => {
  verify(username, password)
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
