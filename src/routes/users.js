const { requestTo } = require("../common/helpers/asyncUtils");
const handlers = require("./handlers/users");
const validateInput = require("../middlewares/validateInput");
const { param, body } = require("express-validator");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.get("/users", requestTo(handlers.list));

  app.post(
    "/users/register",
    body("first_name").isLength({ min: 2, max: 30 }),
    body("last_name").isLength({ min: 2, max: 30 }).optional(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8, max: 30 }),
    body("roles").isArray(),
    validateInput,
    requestTo(handlers.register)
  );

  app.get(
    "/users/:id",
    param("id").isNumeric().toInt(),
    validateInput,
    requestTo(handlers.findById)
  );

  app.patch(
    "/users/set-password",
    (req, res, next) => {
      // TESTONLY
      req.user = {
        id: 1,
      };

      next();
    }, // TODO Add authentication
    body("oldPassword").isLength({ min: 8, max: 30 }),
    body("newPassword").isLength({ min: 8, max: 30 }),
    validateInput,
    requestTo(handlers.setPassword)
  );

  app.delete(
    "/users/:id",
    param("id").isNumeric().toInt(),
    validateInput,
    requestTo(handlers.destroy)
  );
}

module.exports = {
  register,
};
