const Status = require("../../src/common/helpers/status");
const server = require("../testCommon/testServer").getTestServer();
const methods = require("../../src/api/methods/roles");
const factories = require("../testCommon/database/factories");
const testUtils = require("../testCommon/utils");
jest.mock("../../src/api/methods/roles");

describe("Roles Endpoints", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("GET /roles", () => {
    const kUrl = "/roles";

    test("should return OK if ok", async () => {
      methods.list.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, []))
      );

      const res = await server.get(kUrl);

      expect(res.status).toBe(200);
      expect(methods.list).toHaveBeenCalledWith({});
    });

    test("should return OK with query params", async () => {
      const params = {
        name: "test",
      };

      methods.list.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, []))
      );

      const res = await server.get(testUtils.urlWithQueryParams(kUrl, params));

      expect(res.status).toBe(200);
      expect(methods.list).toHaveBeenCalledWith(params);
    });

    test("should propagate errors", async () => {
      methods.list.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, []))
      );

      const res = await server.get(kUrl);

      expect(res.status).toBe(200);
      expect(methods.list).toHaveBeenCalledWith({});
    });

    test("should return BAD_REQUEST with bad parameters", async () => {
      const invalidParams = {
        name: "",
      };

      const res = await server.get(
        testUtils.urlWithQueryParams(kUrl, invalidParams)
      );

      expect(res.status).toBe(Status.BAD_REQUEST);
      for (const error of res.body.errors) {
        expect(Object.keys(invalidParams)).toContain(error.param);
        expect(error.msg).toBe("Invalid value");
      }
    });
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

  describe("PATCH /roles/update/:id", () => {
    const request = (id, params = {}) => {
      return server.patch(`/roles/update/${id}`).send(params);
    };

    test("should return 200 if ok", async () => {
      const mockRoleOptions = {
        name: "test",
        actions: [],
      };
      const mockRole = factories.Role.build(mockRoleOptions);

      methods.update.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, mockRole))
      );

      const res = await request(1, mockRoleOptions);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(mockRole.name);
      expect(methods.update).toHaveBeenCalledWith(1, mockRoleOptions);
    });

    test("should propagate errors", async () => {
      const mockRoleOptions = {
        name: "test",
        actions: [],
      };

      methods.update.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.FORBIDDEN))
      );

      const res = await request(1, mockRoleOptions);

      expect(res.status).toBe(Status.FORBIDDEN);
    });

    test("should return BAD_REQUEST with bad parameters", async () => {
      const invalidParams = {
        name: "a",
        actions: null,
      };

      const res = await await request(1, invalidParams);

      expect(res.status).toBe(Status.BAD_REQUEST);
      for (const error of res.body.errors) {
        expect(Object.keys(invalidParams)).toContain(error.param);
        expect(error.msg).toBe("Invalid value");
      }
    });
  });
});
