const morgan = require("morgan");
const _ = require("lodash");

/**
 * @param  {Express.App} app
 */
function register(app) {
  morgan.token("req-headers", function (req, res) {
    return JSON.stringify(
      _.pick(req.headers, ["authorization", "content-type", "content-length"])
    );
  });

  process.env.NODE_ENV != "production" &&
    app.use(morgan(":method :url :status :req-headers"));
}

module.exports = { register };
