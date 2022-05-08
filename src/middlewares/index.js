const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const passport = require("./auth/passport");
const morgan = require("./morgan");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.use(cookieParser());
  app.use(helmet());
  app.use(cors());

  morgan.register(app);
  passport.register(app);
}

module.exports = { register };
