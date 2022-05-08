const factories = require("../factories");
let adminRole;

/**
 * Create admin role
 * @return {Promise} role create
 */
async function getAdminRole() {
  if (!adminRole) {
    adminRole = await factories.Role.create({
      id: 0,
      name: "admin",
      is_admin: true,
    });
  }

  return Promise.resolve(adminRole);
}

/**
 * Create guest role
 * @param {int[]} actions ids
 * @return {Promise} role create
 */
async function createGuestRole(actions = []) {
  const guestRole = await factories.Role.create({ name: "guest" });

  if (actions.length > 0) {
    const roleActionsPromises = actions.map((actionId) =>
      factories.RoleAction.create({
        role_id: guestRole.id,
        action_id: actionId,
      })
    );

    await Promise.all(roleActionsPromises);
  }

  return guestRole;
}

module.exports = {
  createGuestRole,
  getAdminRole,
};
