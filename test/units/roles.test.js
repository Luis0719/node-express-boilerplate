const Status = require("../../src/common/helpers/status");
const methods = require("../../src/api/methods/roles");
const { Roles, Actions, RoleActions } =
  require("../../src/common/database").models;
const { dbUtils, factory, prefabs } = require("../testCommon/database");

describe("Roles Methods", () => {
  let roles;
  let action;

  beforeAll(async function () {
    await dbUtils.cleanDatabase(Roles);
    await dbUtils.cleanDatabase(Actions);

    // Create all testable users at the beginning. This makes it easier to parallelize all tests.
    const promises = [
      factory.Role.create({
        name: "test1a",
      }),
      factory.Role.create({
        name: "test2a",
      }),
    ];
    roles = await Promise.all(promises);

    action = await prefabs.actions.createTestAction();
  });

  describe("list", () => {
    test("should list roles happy path", async () => {
      const options = {};

      const result = await methods.list(options);
      expect(result.ok()).toBe(true);
      expect(result.data.length).toBe(roles.length);
    });

    test("should list roles filtered by name", async () => {
      const options = {
        name: "test1a",
      };

      const result = await methods.list(options);
      expect(result.ok()).toBe(true);
      expect(result.data.length).toBe(1);
    });

    test("should list roles filtered by partial name", async () => {
      const options = {
        name: "st1a",
      };

      const result = await methods.list(options);
      expect(result.ok()).toBe(true);
      expect(result.data.length).toBe(1);
    });
  });

  describe("store", () => {
    test("should register new role happy path", async () => {
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
