const factories = require("../factories");
/**
 * Create admin user
 * @param {Object[]} actionParams
 */
async function createTestActions(actionParams = [{ uri: "test" }]) {
  const group = await factories.ActionGroup.create();

  const actionPromises = actionParams.map((param) =>
    factories.Action.create({ group_id: group.id, ...param })
  );
  return Promise.all(actionPromises);
}

module.exports = {
  createTestActions,
};
