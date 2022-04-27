const methods = require("../../src/routes/methods/users");
const { Users } = require("../../src/common/database").models;
const { dbUtils, factory } = require("../testCommon/database");

describe.only("Users Handlers", () => {
  beforeAll(async () => {
    await dbUtils.cleanDatabase(Users);
  });

  describe("findById", () => {
    test("should return user by id", async () => {
      const user = await factory.User.create();

      const result = await methods.findById("" + user.id);
      expect(result.id).toBe(user.id);
    });
  });
});
