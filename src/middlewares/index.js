const passport = require("./passport");

/**
 * @param  {Express.App} app
 */
function register(app) {
  passport.register(app);
}

module.exports = { register };
