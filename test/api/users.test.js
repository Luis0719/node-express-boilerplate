const server = require("../testCommon/testServer").getTestServer();
const methods = require("../../src/routes/methods/users");
jest.mock("../../src/routes/methods/users");

describe("Users Endpoints", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    test("should return 200 if ok", async () => {
      methods.list.mockImplementationOnce(() => Promise.resolve([]));

      const res = await server.get(`/users`);
      expect(res.status).toEqual(200);
      expect(methods.list).toHaveBeenCalledWith({});
    });
  });

  describe("GET /users/:id", () => {
    test("should return 200 with valid user", async () => {
      methods.findById.mockImplementationOnce(() => Promise.resolve({}));

      const res = await server.get(`/users/1`);
      expect(res.status).toEqual(200);
      expect(methods.findById).toHaveBeenCalledWith("1");
    });

    test("should return 404 if user is not found", async () => {
      methods.findById.mockImplementationOnce(() => Promise.resolve(null));

      const res = await server.get(`/users/-1`);
      expect(res.status).toEqual(404);
      expect(methods.findById).toHaveBeenCalledWith("-1");
    });

    test("should return 400 if user id is not valid", async () => {
      const res = await server.get(`/users/INVALID_ID`);
      expect(res.status).toEqual(400);
    });
  });
});
