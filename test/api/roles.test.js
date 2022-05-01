const Status = require("../../src/common/helpers/status");
const server = require("../testCommon/testServer").getTestServer();
const methods = require("../../src/routes/methods/roles");
const factories = require("../testCommon/database/factories");
jest.mock("../../src/routes/methods/roles");

describe("Roles Endpoints", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("POST /roles/store", () => {
    const kUrl = "/roles/store";

    test("should return 200 if ok", async () => {
      const mockRoleOptions = {
        name: "test",
        actions: [],
      };

      const mockRole = factories.Role.build(mockRoleOptions);

      methods.store.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, mockRole))
      );

      const res = await server.post(kUrl).send(mockRoleOptions);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(mockRole.name);
      expect(methods.store).toHaveBeenCalledWith(mockRoleOptions);
    });

    test("should propagate errors", async () => {
      const mockRoleOptions = {
        name: "test",
        actions: [],
      };

      methods.store.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.FORBIDDEN))
      );

      const res = await server.post(kUrl).send(mockRoleOptions);

      expect(res.status).toBe(Status.FORBIDDEN);
    });

    test("should return BAD_REQUEST with bad parameters", async () => {
      const invalidParams = {
        name: "a",
        actions: null,
      };

      const res = await server.post(kUrl).send(invalidParams);

      expect(res.status).toBe(Status.BAD_REQUEST);
      for (const error of res.body.errors) {
        expect(Object.keys(invalidParams)).toContain(error.param);
        expect(error.msg).toBe("Invalid value");
      }
    });
  });
});
