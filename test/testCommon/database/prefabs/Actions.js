const factories = require("../factories");
/**
 * Create admin user
 */
async function createTestAction() {
  const group = await factories.ActionGroup.create();
  const action = await factories.Action.create({ group_id: group.id });

  return action;
}

module.exports = {
  createTestAction,
};
