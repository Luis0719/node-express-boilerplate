const passport = require("passport");

const jwtStrategy = require("./jwt-strategy").strategy;
const localStrategy = require("./local-strategy").strategy;
/**
 * @param  {Express.App} app
 */
function register(app) {
  passport.use(localStrategy);
  passport.use("jwt", jwtStrategy);

  app.use(passport.initialize());
}

module.exports = { register };
