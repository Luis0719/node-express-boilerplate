const Status = require("./status");
const errorHandler = require("../../common/helpers/errorHandler");

const errorToStatusMap = {
  SequelizeUniqueConstraintError: Status.BAD_REQUEST,
};

/**
 * @param  {Sequelize.BaseError} error
 * @return {Status}
 */
function toStatusError(error) {
  if (!error.name && !errorToStatusMap[error.name]) {
    errorHandler(error);
    return new Status(Status.INTERNAL_ERROR);
  }

  return new Status(errorToStatusMap[error.name], error.original.detail);
}

module.exports = {
  toStatusError,
};
