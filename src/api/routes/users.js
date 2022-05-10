const { requestTo } = require("../../common/helpers/asyncUtils");
const handlers = require("../handlers/users");
const validateInput = require("../../middlewares/validateInput");
const authByRole = require("../../middlewares/auth/byRole");
const passport = require("passport");
const { param, body } = require("express-validator");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.get("/users", requestTo(handlers.list));

  // Public version of user creation
  // TODO add recaptcha
  app.post(
    "/users/register",
    body("first_name").isLength({ min: 2, max: 50 }),
    body("last_name").isLength({ min: 2, max: 50 }).optional(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8, max: 50 }),
    body("roles").isArray().default([]),
    validateInput,
    requestTo(handlers.register)
  );

  app.post(
    "/users/store",
    body("first_name").isLength({ min: 2, max: 50 }),
    body("last_name").isLength({ min: 2, max: 50 }).optional(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8, max: 50 }),
    body("roles").isArray(),
    validateInput,
    passport.authenticate("jwt", { session: false }),
    authByRole,
    requestTo(handlers.register)
  );

  app.get(
    "/users/find/:id",
    param("id").isNumeric().toInt(),
    validateInput,
    passport.authenticate("jwt", { session: false }),
    authByRole,
    requestTo(handlers.findById)
  );

  app.patch(
    "/users/update/set-password",
    body("oldPassword").isLength({ min: 8, max: 50 }),
    body("newPassword").isLength({ min: 8, max: 50 }),
    validateInput,
    passport.authenticate("jwt", { session: false }),
    authByRole,
    requestTo(handlers.setPassword)
  );

  app.delete(
    "/users/delete/:id",
    param("id").isNumeric().toInt(),
    validateInput,
    passport.authenticate("jwt", { session: false }),
    authByRole,
    requestTo(handlers.destroy)
  );
}

module.exports = {
  register,
};
