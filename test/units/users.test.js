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
  beforeAll(async () => {
    await dbUtils.cleanDatabase(Users);
  });

  describe("list", () => {
    let users;

    beforeAll(async function () {
      const promises = [
        factory.User.create({
          first_name: "test1a",
          last_name: "last1a",
          username: "list_test1_1",
        }),
        factory.User.create({
          first_name: "test2a",
          last_name: "last2a",
          username: "list_test1_2",
        }),
      ];
      users = await Promise.all(promises);
    });

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
      const user = await factory.User.create({ username: "findById_test1_1" });

      const result = await methods.findById("" + user.id);
      expect(result.id).toBe(user.id);
    });
  });
});
