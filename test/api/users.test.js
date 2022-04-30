const Status = require("../../src/common/helpers/status");
const server = require("../testCommon/testServer").getTestServer();
const methods = require("../../src/routes/methods/users");
jest.mock("../../src/routes/methods/users");

describe("Users Endpoints", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    test("should return 200 if ok", async () => {
      methods.list.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK), [{ id: "XXXXX" }])
      );

      const res = await server.get(`/users`);

      expect(res.status).toBe(200);
      expect(methods.list).toHaveBeenCalledWith({});
    });

    // TODO add query filters coverage
  });

  describe("GET /users/:id", () => {
    test("should return 200 with valid user", async () => {
      methods.findById.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK), {})
      );

      const res = await server.get(`/users/1`);
      expect(res.status).toEqual(200);
      expect(methods.findById).toHaveBeenCalledWith("1");
    });

    test("should return 404 if user is not found", async () => {
      methods.findById.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.NOT_FOUND))
      );

      const res = await server.get(`/users/-1`);
      expect(res.status).toEqual(404);
      expect(methods.findById).toHaveBeenCalledWith("-1");
    });

    test("should return 400 if user id is not valid", async () => {
      const res = await server.get(`/users/INVALID_ID`);
      expect(res.status).toEqual(400);
    });
  });

  describe("DELETE /users/:id", () => {
    test("should return 200 with valid user id", async () => {
      methods.destroy.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK))
      );

      const res = await server.delete(`/users/1`);
      expect(res.status).toEqual(200);
      expect(methods.destroy).toHaveBeenCalledWith("1");
    });

    test("should return 400 if user id is not valid", async () => {
      const res = await server.delete(`/users/INVALID_ID`);
      expect(res.status).toEqual(400);
    });

    test("should expose error", async () => {
      methods.destroy.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.FORBIDDEN))
      );
      const res = await server.delete(`/users/1`);
      expect(res.status).toEqual(403);
      expect(methods.destroy).toHaveBeenCalledWith("1");
    });
  });
});
