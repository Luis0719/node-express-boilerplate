const controllers = require("../handlers/health");

/**
 * @param  {express.Router} router
 */
function register(router) {
  router.get("/ping", controllers.ping);
}

module.exports = { register };
