const handlers = require("./handlers/users");
const validateInput = require("../middlewares/validateInput");
const { param } = require("express-validator");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.get(
    "/users/:id",
    param("id").isNumeric(),
    validateInput,
    handlers.findById
  );
}

module.exports = {
  register,
};
