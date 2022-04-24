const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("./passport");
const morgan = require("morgan");
const logging = require("./serverLogging");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.use(cookieParser());
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));

  logging.register(app);
  passport.register(app);
}

module.exports = { register };
