const Status = require("../../src/common/helpers/status");
const methods = require("../../src/routes/methods/users");
const { Users } = require("../../src/common/database").models;
const { dbUtils, factory } = require("../testCommon/database");
const crypto = require("../../src/common/crypto");
/**
 * @param  {Sequelize.Models.Users[]} users
 * @return {int[]}
 */
function usersToIdList(users) {
  return users.map((x) => x.id);
}

describe("Users Methods", () => {
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
        email: "user1@test.com",
        username: "user1@test.com",
      }),
      factory.User.create({
        first_name: "test2a",
        last_name: "last2a",
        email: "user2@test.com",
        username: "user2@test.com",
      }),
      factory.User.create({
        first_name: "delete",
        last_name: "me",
        email: "delete_me@test.com",
        username: "delete_me@test.com",
      }),
    ];
    users = await Promise.all(promises);

    userIdToDelete = users[2].id;
  });

  describe("list", () => {
    test("should return list of users", async () => {
      const result = await methods.list({});
      expect(result.ok()).toBe(true);
      expect(result.getData().length).toBe(users.length);
      expect(usersToIdList(result.data)).toEqual(
        expect.arrayContaining(usersToIdList(users))
      );
    });

    test("should filter by first name", async () => {
      const result = await methods.list({ name: "test1a" });
      expect(result.ok()).toBe(true);
      expect(result.data.length).toBe(1);
      expect(result.data[0].id).toBe(users[0].id);
    });

    test("should filter by first name partial", async () => {
      const result = await methods.list({ name: "est1" });
      expect(result.ok()).toBe(true);
      expect(result.data.length).toBe(1);
      expect(result.data[0].id).toBe(users[0].id);
    });

    test("should filter by last name", async () => {
      const result = await methods.list({ name: "last1a" });
      expect(result.ok()).toBe(true);
      expect(result.data.length).toBe(1);
      expect(result.data[0].id).toBe(users[0].id);
    });

    test("should filter by last name partial", async () => {
      const result = await methods.list({ name: "ast1" });
      expect(result.ok()).toBe(true);
      expect(result.data.length).toBe(1);
      expect(result.data[0].id).toBe(users[0].id);
    });
  });

  describe("register", () => {
    test("should register new user happy path", async () => {
      const options = {
        first_name: "create_test1_firstname",
        last_name: "create_test1_lastname",
        email: "create_test@test.com",
        password: "create_test_password",
        roles: [],
      };

      const result = await methods.register(options);
      const user = result.data;
      expect(result.ok()).toBe(true);
      expect(user.first_name).toBe(options.first_name);
      expect(user.last_name).toBe(options.last_name);
      expect(user.email).toBe(options.email);
      expect(user.username).toBe(options.email);

      const passwordMatch = await user.passwordMatch(options.password);
      expect(passwordMatch).toBe(true);
    });

    test("should not register user with duplicated email", async () => {
      const options = {
        email: "user1@test.com",
      };

      const result = await methods.register(options);
      expect(result.ok()).toBe(false);
      expect(result.getError().statusCode).toBe(Status.BAD_REQUEST);
      expect(result.getData()).toMatch(options.email + " already exists");
    });
  });

  describe("findById", () => {
    test("should return user by id", async () => {
      const result = await methods.findById(users[0].id);
      expect(result.ok()).toBe(true);
      expect(result.data.id).toBe(users[0].id);
    });

    test("should return NOT_FOUND status if user is not found", async () => {
      const result = await methods.findById("-1");
      expect(result.ok()).toBe(false);
      expect(result.getError().statusCode).toBe(Status.NOT_FOUND);
    });
  });

  describe("destroy", () => {
    test("should return destroy user by id", async () => {
      const userToDelete = await Users.findOne({
        where: { id: userIdToDelete },
      });
      expect(userToDelete).not.toBeNull();

      const result = await methods.destroy(userIdToDelete);
      expect(result.ok()).toBe(true);

      const deletedUser = await Users.findOne({
        where: { id: userIdToDelete },
      });
      expect(deletedUser).toBeNull();
    });

    test("should not fail if user is not found", async () => {
      const result = await methods.destroy("-1");
      expect(result.ok()).toBe(true);
    });
  });
});
