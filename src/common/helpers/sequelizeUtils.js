const Status = require("./status");
const logger = require("../../common/logger");

const errorToStatusMap = {
  SequelizeUniqueConstraintError: Status.BAD_REQUEST,
};

/**
 * @param  {Sequelize.BaseError} error
 * @return {Status}
 */
function toStatusError(error) {
  if (!errorToStatusMap[error.name]) {
    logger.error("Could not find " + error.name);
    return new Status(Status.INTERNAL_ERROR);
  }

  return new Status(errorToStatusMap[error.name], error.original.detail);
}

module.exports = {
  toStatusError,
};
