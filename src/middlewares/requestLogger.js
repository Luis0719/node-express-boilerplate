const { logger } = require('common').utils;

module.exports = (req, res, next) => {
  req.logger = logger;
  next();
};
