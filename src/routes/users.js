const { requestTo } = require("../common/helpers/asyncUtils");
const handlers = require("./handlers/users");
const validateInput = require("../middlewares/validateInput");
const { param } = require("express-validator");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.get("/users", requestTo(handlers.list));

  app.get(
    "/users/:id",
    param("id").isNumeric(),
    validateInput,
    requestTo(handlers.findById)
  );

  app.delete(
    "/users/:id",
    param("id").isNumeric(),
    validateInput,
    requestTo(handlers.destroy)
  );
}

module.exports = {
  register,
};
