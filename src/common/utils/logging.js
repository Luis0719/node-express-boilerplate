const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.simple()
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
        format.simple()
      ),
    }),
  ],
});

module.exports = logger;
