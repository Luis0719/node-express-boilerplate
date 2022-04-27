const { validationResult } = require("express-validator");

/**
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.Next} next
 * @return {Express.Response} returns on error. Otherwise call next.
 */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

module.exports = validate;
