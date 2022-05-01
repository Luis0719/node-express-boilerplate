const { requestTo } = require("../../common/helpers/asyncUtils");
const handlers = require("../handlers/roles");
const validateInput = require("../../middlewares/validateInput");
const { body, query } = require("express-validator");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.get(
    "/roles",
    query("name").isLength({ min: 2, max: 15 }).optional(),
    validateInput,
    requestTo(handlers.list)
  );

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
