const pkg = require("../../package.json");

/**
 * @param  {express.Router} router
 */
function register(router) {
  router.get("/ping", function (req, res, next) {
    res.send({
      name: "Storagenizer",
      version: pkg.version,
    });
  });
}

module.exports = { register };
