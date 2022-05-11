const methods = require("../methods/users");
const httpErrors = require("http-errors");
const { to } = require("../../common/helpers/asyncUtils");
const httpResponse = require("../../common/helpers/httpResponse");
const errorHandler = require("../../common/helpers/errorHandler");

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 * @return {User[]|HttpError} list of users
 */
async function list(req, res, next) {
  const options = req.query;
  const [err, result] = await to(methods.list(options));

  if (err) {
    errorHandler.handle(err);
    return next(new httpErrors.InternalServerError());
  }

  if (!result.ok()) {
    return next(result.getError());
  }

  return httpResponse.representListAs(res, "basicUser", result.data);
}

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 * @return {User|HttpError} created user
 */
async function register(req, res, next) {
  const options = req.body;
  const [err, result] = await to(methods.register(options));

  if (err) {
    errorHandler.handle(err);
    return next(new httpErrors.InternalServerError());
  }

  if (!result.ok()) {
    return next(result.getError());
  }

  return httpResponse.representAs(res, "basicUser", result.data);
}

/**
 * Given a userId, find a user in the db
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 * @return {User|HttpError} user
 */
async function findById(req, res, next) {
  const [err, result] = await to(methods.findById(req.params.id));

  if (err) {
    errorHandler.handle(err);
    return next(new httpErrors.InternalServerError());
  }

  if (!result.ok()) {
    return next(result.getError());
  }

  return httpResponse.representAs(res, "profileUser", result.data);
}

/**
 * Delete user with given id.
 * If database config is paranoid, then user will be soft deleted
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 * @return {_|HttpError} user
 */
async function setPassword(req, res, next) {
  const id = req.user.id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const [err, result] = await to(
    methods.setPassword(id, oldPassword, newPassword)
  );

  if (err) {
    errorHandler.handle(err);
    return next(new httpErrors.InternalServerError());
  }

  if (!result.ok()) {
    return next(result.getError());
  }

  return httpResponse.ok(res);
}

/**
 * Delete user with given id.
 * If database config is paranoid, then user will be soft deleted
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 * @return {User|HttpError} user
 */
async function destroy(req, res, next) {
  const [err, result] = await to(methods.destroy(req.params.id));

  if (err) {
    errorHandler.handle(err);
    return next(new httpErrors.InternalServerError());
  }

  if (!result.ok()) {
    return next(result.getError());
  }

  return httpResponse.ok(res);
}

module.exports = {
  destroy,
  findById,
  list,
  register,
  setPassword,
};
