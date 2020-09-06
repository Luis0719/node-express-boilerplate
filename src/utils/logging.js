const { createLogger, transports, format } = require('winston');

const printFormat = info => {
  const timestamp = info.timestamp;
  const message =
    typeof info.message === 'object'
      ? JSON.stringify(info.message)
      : info.message;
  const level = info.level;

  return `${timestamp} [${level}]: ${message}`;
};

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.simple(),
    format.printf(printFormat)
  ),
  transports: [
    new transports.File({
      filename: './logs/server.log',
      json: true,
      maxsize: 4194304,
      maxFiles: 10,
    }),
    new transports.Console({
      format: format.combine(
        // Had to redefine all format props to get it colorized only for console.
        // Otherwise it prints weird characters in the file
        format.colorize(),
        format.simple(),
        format.printf(printFormat)
      ),
    }),
  ],
});

module.exports = logger;
