const pkg = require("../../package.json");
const winston = require("winston");

const devLoggingFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);
const prodLoggingFormat = winston.format.combine(
  winston.format.label({ service: pkg.name }),
  winston.format.timestamp(),
  winston.format.printf(({ level, message, service, timestamp }) => {
    return `${timestamp} [${service}] ${level}: ${message}`;
  })
);

/**
 * @param  {Express.App} app
 */
function register(app) {
  const logger = winston.createLogger({
    level: "info",
    format: prodLoggingFormat,
    defaultMeta: { service: pkg.name },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
      }),
      new winston.transports.File({ filename: "logs/combined.log" }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: "logs/exceptions.log" }),
      new winston.transports.Console({}),
    ],
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: devLoggingFormat,
      })
    );
  }

  app.use(function (req, res, next) {
    req.logger = logger;
    next();
  });
}

module.exports = {
  register,
};
