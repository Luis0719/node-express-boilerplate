const { requestTo } = require("../../common/helpers/asyncUtils");
const handlers = require("../handlers/roles");
const validateInput = require("../../middlewares/validateInput");
const authByRole = require("../../middlewares/auth/byRole");
const passport = require("passport");
const { body, query, param } = require("express-validator");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.get(
    "/roles",
    query("name").isLength({ min: 2, max: 40 }).optional(),
    validateInput,
    passport.authenticate("jwt", { session: false }),
    authByRole,
    requestTo(handlers.list)
  );

  app.post(
    "/roles/store",
    body("name").isLength({ min: 2, max: 40 }),
    body("actions").isArray(),
    validateInput,
    passport.authenticate("jwt", { session: false }),
    authByRole,
    requestTo(handlers.store)
  );

  app.patch(
    "/roles/update/:id",
    param("id").isNumeric().toInt(),
    body("name").isLength({ min: 2, max: 40 }),
    body("actions").isArray(),
    validateInput,
    passport.authenticate("jwt", { session: false }),
    authByRole,
    requestTo(handlers.update)
  );
}

module.exports = {
  register,
};
