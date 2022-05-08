const Status = require("../../../src/common/helpers/status");
const server = require("../../testCommon/testServer").getTestServer();
const methods = require("../../../src/api/methods/roles");
const factories = require("../../testCommon/database/factories");
const testUtils = require("../../testCommon/utils");
jest.mock("../../../src/api/methods/roles");

describe("Roles Endpoints", () => {
  describe("GET /roles", () => {
    const kUrl = "/roles";
    const request = (queryParams) => {
      if (queryParams) {
        return server.get(testUtils.urlWithQueryParams(kUrl, queryParams));
      }

      return server.get(kUrl);
    };

    test("should return OK if ok", async () => {
      methods.list.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, []))
      );

      const res = await request();

      expect(res.status).toBe(200);
      expect(methods.list).toHaveBeenCalledWith({});
    });

    test("should return OK with query params", async () => {
      const queryParams = {
        name: "test",
      };

      methods.list.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, []))
      );

      const res = await request(queryParams);

      expect(res.status).toBe(200);
      expect(methods.list).toHaveBeenCalledWith(queryParams);
    });

    test("should propagate errors", async () => {
      methods.list.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, []))
      );

      const res = await request();

      expect(res.status).toBe(200);
      expect(methods.list).toHaveBeenCalledWith({});
    });

    test("should return BAD_REQUEST with bad parameters", async () => {
      const invalidParams = {
        name: "",
      };

      const res = await request(invalidParams);

      expect(res.status).toBe(Status.BAD_REQUEST);
      for (const error of res.body.errors) {
        expect(Object.keys(invalidParams)).toContain(error.param);
        expect(error.msg).toBe("Invalid value");
      }
    });
  });

  describe("POST /roles/store", () => {
    const kUrl = "/roles/store";
    const request = (params = {}) => {
      return server.post(kUrl).send(params);
    };

    test("should return 200 if ok", async () => {
      const mockRoleOptions = {
        name: "test",
        actions: [],
      };

      const mockRole = factories.Role.build(mockRoleOptions);

      methods.store.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, mockRole))
      );

      const res = await request(mockRoleOptions);

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

      const res = await request(mockRoleOptions);

      expect(res.status).toBe(Status.FORBIDDEN);
    });

    test("should return BAD_REQUEST with bad parameters", async () => {
      const invalidParams = {
        name: "a",
        actions: null,
      };

      const res = await request(invalidParams);

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
