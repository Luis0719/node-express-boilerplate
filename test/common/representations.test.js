const representations = require("../../src/common/helpers/representations");
const factories = require("../testCommon/database/factories");

describe("Representations", () => {
  describe("Users", () => {
    let mockUser;

    beforeAll(() => {
      mockUser = factories.User.build({
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    test("BasicUser", () => {
      const kRepName = "basicUser";
      const rep = representations[kRepName];

      const result = rep(mockUser);
      expect(Object.keys(result)).toEqual(
        expect.arrayContaining([
          "id",
          "first_name",
          "last_name",
          "full_name",
          "email",
          "createdAt",
        ])
      );

      expect(result.first_name).toBe(mockUser.first_name);
    });

    test("ProfileUser", () => {
      const kRepName = "profileUser";
      const rep = representations[kRepName];

      const result = rep(mockUser);
      expect(Object.keys(result)).toEqual(
        expect.arrayContaining([
          "id",
          "first_name",
          "last_name",
          "full_name",
          "image",
          "username",
          "roles",
          "email",
          "phone",
          "createdAt",
          "updatedAt",
        ])
      );

      expect(result.first_name).toBe(mockUser.first_name);
    });
  });
});
