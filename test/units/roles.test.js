const Status = require("../../src/common/helpers/status");
const methods = require("../../src/routes/methods/roles");
const { Roles, RoleActions } = require("../../src/common/database").models;
const { dbUtils, factory, prefabs } = require("../testCommon/database");

describe("Roles Methods", () => {
  let roles;
  let action;

  beforeAll(async function () {
    await dbUtils.cleanDatabase(Roles);

    // Create all testable users at the beginning. This makes it easier to parallelize all tests.
    const promises = [];
    roles = await Promise.all(promises);

    action = await prefabs.actions.createTestAction();
  });

  describe("store", () => {
    test("should register new user happy path", async () => {
      const params = {
        name: "create_test1_name",
        actions: [action.id],
      };

      const result = await methods.store(params);
      const role = result.data;
      expect(result.ok()).toBe(true);
      expect(role.name).toBe(params.name);

      const actions = await RoleActions.findAll({
        where: { role_id: role.id },
      });

      expect(actions.length).toBe(1);
      expect(actions[0].id).toBe(action.id);
    });
  });
});
