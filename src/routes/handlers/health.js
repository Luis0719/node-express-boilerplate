const pkg = require("../../../package.json");

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 */
function ping(req, res) {
  res.send({
    name: pkg.name,
    version: pkg.version,
  });
}

module.exports = {
  ping,
};
