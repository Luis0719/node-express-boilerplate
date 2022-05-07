const { requestTo } = require("../../common/helpers/asyncUtils");
const handlers = require("../handlers/roles");
const validateInput = require("../../middlewares/validateInput");
const { body, query, param } = require("express-validator");

/**
 * @param  {Express.App} app
 */
function register(app) {
  app.get(
    "/roles",
    query("name").isLength({ min: 2, max: 40 }).optional(),
    validateInput,
    requestTo(handlers.list)
  );

  app.post(
    "/roles/store",
    body("name").isLength({ min: 2, max: 40 }),
    body("actions").isArray(),
    validateInput,
    requestTo(handlers.store)
  );

  app.patch(
    "/roles/update/:id",
    param("id").isNumeric().toInt(),
    body("name").isLength({ min: 2, max: 40 }),
    body("actions").isArray(),
    validateInput,
    requestTo(handlers.update)
  );
}

module.exports = {
  register,
};
