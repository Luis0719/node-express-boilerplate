const methods = require("../methods/users");
const { to } = require("../../common/helpers/asyncUtils");
const httpErrors = require("http-errors");

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 * @return {Sequelize.Model.User[]} list of users
 */
async function list(req, res, next) {
  const options = req.query;
  const [err, users] = await to(methods.list(options));

  if (err) {
    req.logger.error(err);
    return next(new httpErrors.InternalServerError());
  }

  return res.send(users);
}

/**
 * Given a userId, find a user in the db
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 * @return {Sequelize.Model.User|HttpError} user
 */
async function findById(req, res, next) {
  const [err, user] = await to(methods.findById(req.params.id));

  if (err) {
    req.logger.error(err);
    return next(new httpErrors.InternalServerError());
  }

  if (!user) {
    return next(new httpErrors.NotFound());
  }

  return res.send(user);
}

module.exports = {
  findById,
  list,
};