const morgan = require("morgan");

/**
 * @param  {Express.App} app
 */
function register(app) {
  morgan.token("req-headers", function (req, res) {
    return JSON.stringify(req.headers);
  });

  process.env.NODE_ENV != "production" &&
    app.use(morgan(":method :url :status :req-headers"));
}

module.exports = { register };
