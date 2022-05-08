const { to } = require("../../common/helpers/asyncUtils");
const httpErrors = require("http-errors");
const methods = require("./methods");
const logger = require("../../common/logger");

/**
 * @param  {Sequelize.Request} req
 * @param  {Sequelize.Response} res
 * @param  {Sequelize.Next} next
 */
async function byRole(req, res, next) {
  const user = req.user;
  const url = req.route.path;
  const method = req.method;

  const [error, hasPermission] = await to(
    methods.hasRolePermission(user, url, method)
  );

  if (error) {
    logger.error(err.message);
    logger.error(err.stack);
    return next(error);
  }

  if (!hasPermission) {
    return next(
      new httpErrors.Unauthorized(
        "User does not have permission to perform this action"
      )
    );
  }

  return next();
}

module.exports = byRole;
