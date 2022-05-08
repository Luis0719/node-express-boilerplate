const methods = require("../../../src/middlewares/auth/methods");
const prefabs = require("../../testCommon/database/prefabs");
const _ = require("lodash");

describe("Middlewars auth methods", () => {
  let users = [];
  let actions = [];
  let guestPermissions = [];
  let admin;
  let guest;

  beforeAll(async () => {
    const actionsPromises = [
      prefabs.actions.createTestActions(),
      prefabs.actions.createTestActions(),
    ];
    actions = await Promise.all(actionsPromises);
    guestPermissions = [actions[0]];

    const usersPromises = [
      prefabs.users.getAdmin(),
      prefabs.users.createGuest(_.map(guestPermissions, "id")),
    ];
    users = await Promise.all(usersPromises);
    admin = users[0];
    guest = users[1];
  });

  describe("findUser", () => {
    test("should return user happy path", async () => {
      const user = await methods.findUser(guest.id);
      expect(user.id).toBe(guest.id);
      expect(user.roles).toEqual(guest.roles);
    });

    test("should return null if user is not found", async () => {
      const user = await methods.findUser(-1);
      expect(user).toBeNull();
    });
  });

  describe("hasPermission", () => {
    test("should return true for admins", async () => {
      const result = await methods.hasRolePermission(
        admin,
        actions[0].uri,
        actions[0].method
      );
      expect(result).toBe(true);
    });

    test("should return true for user has permission", async () => {
      const result = await methods.hasRolePermission(
        guest,
        guestPermissions[0].uri,
        guestPermissions[0].method
      );
      expect(result).toBe(true);
    });

    test("should return false for user without permission", async () => {
      const result = await methods.hasRolePermission(
        guest,
        actions[1].uri,
        actions[1].method
      );
      expect(result).toBe(true);
    });
  });
});
