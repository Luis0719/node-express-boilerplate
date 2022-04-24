const passport = require("passport");

const jwtStrategy = require("./jwt-strategy");
const localStrategy = require("./local-strategy");
/**
 * @param  {Express.App} app
 */
function register(app) {
  passport.use(localStrategy);
  passport.use(jwtStrategy);

  app.use(passport.initialize());
}

module.exports = { register };
