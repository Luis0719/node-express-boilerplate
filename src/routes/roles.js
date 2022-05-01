const { requestTo } = require("../common/helpers/asyncUtils");
const handlers = require("./handlers/roles");
const validateInput = require("../middlewares/validateInput");
const { body } = require("express-validator");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.post(
    "/roles/store",
    body("name").isLength({ min: 2, max: 15 }),
    body("actions").isArray(),
    validateInput,
    requestTo(handlers.store)
  );
}

module.exports = {
  register,
};
