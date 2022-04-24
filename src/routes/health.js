const controllers = require("../controllers/health");

/**
 * @param  {express.Router} router
 */
function register(router) {
  router.get("/ping", controllers.ping);
}

module.exports = { register };
