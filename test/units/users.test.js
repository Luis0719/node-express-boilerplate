const Status = require('../../src/common/helpers/status');
const methods = require("../../src/routes/methods/users");
const { Users } = require("../../src/common/database").models;
const { dbUtils, factory } = require("../testCommon/database");
/**
 * @param  {Sequelize.Models.Users[]} users
 * @return {int[]}
 */
function usersToIdList(users) {
  return users.map((x) => x.id);
}

describe("Users Handlers", () => {
  let users;
  let userIdToDelete;

  beforeAll(async () => {
    await dbUtils.cleanDatabase(Users);
  });

  beforeAll(async function () {
    // Create all testable users at the beginning. This makes it easier to parallelize all tests.
    const promises = [
      factory.User.create({
        first_name: "test1a",
        last_name: "last1a",
        username: "user1",
      }),
      factory.User.create({
        first_name: "test2a",
        last_name: "last2a",
        username: "user2",
      }),
      factory.User.create({
        first_name: "delete",
        last_name: "me",
        username: "delete_me",
      }),
    ];
    users = await Promise.all(promises);

    userIdToDelete = users[2].id;
  });

  describe("list", () => {
    test("should return list of users", async () => {
      const result = await methods.list({});
      expect(result.length).toBe(users.length);
      expect(usersToIdList(result)).toEqual(
        expect.arrayContaining(usersToIdList(users))
      );
    });

    test("should filter by first name", async () => {
      const result = await methods.list({ name: "test1a" });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(users[0].id);
    });

    test("should filter by first name partial", async () => {
      const result = await methods.list({ name: "est1" });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(users[0].id);
    });

    test("should filter by last name", async () => {
      const result = await methods.list({ name: "last1a" });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(users[0].id);
    });

    test("should filter by last name partial", async () => {
      const result = await methods.list({ name: "ast1" });
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(users[0].id);
    });
  });

  describe("findById", () => {
    test("should return user by id", async () => {
      const result = await methods.findById(users[0].id);
      expect(result.id).toBe(users[0].id);
    });

    test("should return null if not found", async () => {
      const result = await methods.findById("-1");
      expect(result).toBeNull();
    });
  });

  describe("destroy", () => {
    test("should return destroy user by id", async () => {
      const userToDelete = await Users.findOne({where:{id: userIdToDelete}});
      expect(userToDelete).not.toBeNull();

      const result = await methods.destroy(userIdToDelete);
      expect(result.ok()).toBe(true);

      const deletedUser = await Users.findOne({where:{id: userIdToDelete}});
      expect(deletedUser).toBeNull();
    });

    test("should not fail if user is not found", async () => {
      const result = await methods.destroy("-1");
      expect(result.ok()).toBe(true);
    });
  });
});
