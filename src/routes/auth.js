const controller = require("../controllers/auth");
const passport = require("passport");

/**
 * @param  {express.Router} router
 */
function register(router) {
  router.get("/auth/login", passport.authenticate("local"), controller.login);
}

module.exports = { register };
