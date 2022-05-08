const factories = require("../factories");
let counter = 1; // Used to avoid duplicate actions. Add 1 each time an action is created
/**
 * Create admin user
 * @param {Object[]} actionParams
 */
async function createTestActions(actionParams = [{ uri: "test" + counter++ }]) {
  const group = await factories.ActionGroup.create();

  const actionPromises = actionParams.map((param) =>
    factories.Action.create({ group_id: group.id, ...param })
  );
  return Promise.all(actionPromises);
}

module.exports = {
  createTestActions,
};
