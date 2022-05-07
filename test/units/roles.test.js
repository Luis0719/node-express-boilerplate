const Status = require("../../src/common/helpers/status");
const methods = require("../../src/api/methods/roles");
const { Roles, Actions, RoleActions } =
  require("../../src/common/database").models;
const { dbUtils, factory, prefabs } = require("../testCommon/database");
const _ = require("lodash");

describe("Roles Methods", () => {
  let roles;
  let actions;

  beforeAll(async function () {
    await dbUtils.cleanDatabase(Roles);
    await dbUtils.cleanDatabase(Actions);

    actions = await prefabs.actions.createTestActions([
      { uri: "action1" },
      { uri: "action2" },
      { uri: "action3" },
    ]);

    // Create all testable users at the beginning. This makes it easier to parallelize all tests.
    const rolePromises = [
      factory.Role.create({
        name: "test1a",
      }),
      factory.Role.create({
        name: "test2a",
      }),
      factory.Role.create({
        name: "update_me",
      }),
    ];
    roles = await Promise.all(rolePromises);
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
        actions: [actions[0].id],
      };

      const result = await methods.store(params);
      const role = result.data;
      expect(result.ok()).toBe(true);
      expect(role.name).toBe(params.name);

      const roleActionsResult = await RoleActions.findAll({
        attributes: ["action_id"],
        where: { role_id: role.id },
        raw: true,
      });

      expect(roleActionsResult.length).toBe(1);
      expect(roleActionsResult[0].action_id).toBe(actions[0].id);
    });

    test("should not have duplicated names", async () => {
      const params = {
        name: "create_test2_repeated_name",
        actions: [],
      };

      await methods.store(params);
      const result = await methods.store(params);
      expect(result.ok()).toBe(false);
      expect(result.getError().statusCode).toBe(Status.BAD_REQUEST);
      expect(result.getError().message).toMatch(
        "Key (name)=(create_test2_repeated_name) already exists"
      );
    });
  });

  describe("update", () => {
    beforeAll(async () => {
      const roleActionsPromises = [
        factory.RoleAction.create({
          role_id: roles[2].id,
          action_id: actions[0].id,
        }),
        factory.RoleAction.create({
          role_id: roles[2].id,
          action_id: actions[1].id,
        }),
      ];
      await Promise.all(roleActionsPromises);
    });

    test("should change name and create/delete actions", async () => {
      const roleToUpdate = roles[2];
      const actionToCreate = actions[2];
      const actionToKeep = actions[1];
      const actionToDelete = actions[0];

      const params = {
        name: "updated",
        actions: [actionToCreate.id, actionToKeep.id],
      };

      // Validate current actions so we don't get false positives if setup is
      // not correct
      const roleActionsCurrent = await RoleActions.findAll({
        where: { role_id: roleToUpdate.id },
        attributes: ["action_id"],
        raw: true,
      });
      expect(_.map(roleActionsCurrent, "action_id")).toEqual(
        expect.arrayContaining([actionToDelete.id, actionToKeep.id])
      );

      const result = await methods.update(roleToUpdate.id, params);
      expect(result.ok()).toBe(true);

      await roleToUpdate.reload();
      expect(roleToUpdate.name).toBe(params.name);

      const roleActionsResult = await RoleActions.findAll({
        where: { role_id: roleToUpdate.id },
        attributes: ["action_id"],
        raw: true,
      });
      expect(roleActionsResult.length).toBe(2);
      expect(_.map(roleActionsResult, "action_id")).toEqual(
        expect.arrayContaining([actionToKeep.id, actionToCreate.id])
      );
    });

    test("should return NOT_FOUND with invalid role", async () => {
      const result = await methods.update(-1, {});
      expect(result.ok()).toBe(false);
      expect(result.getError().statusCode).toBe(Status.NOT_FOUND);
    });
  });
});
