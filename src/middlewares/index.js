const passport = require("./passport");
const requestID = require("express-request-id");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.use(requestID());

  passport.register(app);
}

module.exports = { register };
