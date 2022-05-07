const methods = require("../methods/roles");
const httpErrors = require("http-errors");
const { to } = require("../../common/helpers/asyncUtils");
const httpResponse = require("../../common/helpers/httpResponse");
const logger = require("../../common/logger");

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 */
async function list(req, res, next) {
  const options = req.query;
  const [err, result] = await to(methods.list(options));

  if (err) {
    logger.error(err);
    return next(new httpErrors.InternalServerError());
  }

  if (!result.ok()) {
    return next(result.getError());
  }

  return httpResponse.representListAs(res, "basicRole", result.data);
}

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 */
async function store(req, res, next) {
  const options = req.body;
  const [err, result] = await to(methods.store(options));

  if (err) {
    logger.error(err);
    return next(new httpErrors.InternalServerError());
  }

  if (!result.ok()) {
    return next(result.getError());
  }

  return httpResponse.representAs(res, "basicRole", result.data);
}

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 */
async function update(req, res, next) {
  const params = req.body;
  const [err, result] = await to(methods.update(req.params.id, params));

  if (err) {
    logger.error(err);
    return next(new httpErrors.InternalServerError());
  }

  if (!result.ok()) {
    return next(result.getError());
  }

  return httpResponse.representAs(res, "basicRole", result.data);
}

module.exports = { store, list, update };
