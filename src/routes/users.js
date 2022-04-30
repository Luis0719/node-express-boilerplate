const handlers = require("./handlers/users");
const validateInput = require("../middlewares/validateInput");
const { param } = require("express-validator");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.get("/users", handlers.list);

  app.get(
    "/users/:id",
    param("id").isNumeric(),
    validateInput,
    handlers.findById
  );

  app.delete(
    "/users/:id",
    param("id").isNumeric(),
    validateInput,
    handlers.destroy
  );
}

module.exports = {
  register,
};
