const factories = require("../factories");

/**
 * Create admin role
 * @return {Promise} role create
 */
function createAdminRole() {
  return factories.Role.create({ name: "admin" });
}

module.exports = {
  createAdminRole,
};
