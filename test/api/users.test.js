const Status = require("../../src/common/helpers/status");
const server = require("../testCommon/testServer").getTestServer();
const methods = require("../../src/routes/methods/users");
const factories = require("../testCommon/database/factories");
jest.mock("../../src/routes/methods/users");

describe("Users Endpoints", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    test("should return 200 if ok", async () => {
      const mockUser = factories.User.build();
      methods.list.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, [mockUser]))
      );

      const res = await server.get(`/users`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].first_name).toBe(mockUser.first_name);
      expect(methods.list).toHaveBeenCalledWith({});
    });

    // TODO add query filters coverage
  });

  describe("POST /users/register", () => {
    const kUrl = "/users/register";

    test("should return 200 if ok", async () => {
      const mockUserOptions = {
        first_name: "test",
        last_name: "test",
        email: "test@test.com",
        password: "testpass",
        roles: [],
      };

      const mockUser = factories.User.build(mockUserOptions);

      methods.register.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, mockUser))
      );

      const res = await server.post(kUrl).send(mockUserOptions);

      expect(res.status).toBe(200);
      expect(res.body.first_name).toBe(mockUser.first_name);
      expect(methods.register).toHaveBeenCalledWith(mockUserOptions);
    });

    test("should propagate errors", async () => {
      const mockUserOptions = {
        first_name: "test",
        last_name: "test",
        email: "test@test.com",
        password: "testpass",
        roles: [],
      };

      methods.register.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.BAD_REQUEST))
      );

      const res = await server.post(kUrl).send(mockUserOptions);

      expect(res.status).toBe(Status.BAD_REQUEST);
    });

    test("should allow optional inputs", async () => {
      const params = {
        first_name: "test",
        // last_name: "test", OPTIONAL
        email: "test@test.com",
        password: "testpass",
        roles: [],
      };

      methods.register.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, {}))
      );

      const res = await server.post(kUrl).send(params);

      expect(res.status).toBe(Status.OK);
    });

    test("should return BAD_REQUEST with bad parameters", async () => {
      const invalidParams = {
        first_name: "a",
        last_name: "a",
        email: "not_an_email",
        password: "a",
        roles: null,
      };

      const res = await server.post(kUrl).send(invalidParams);

      expect(res.status).toBe(Status.BAD_REQUEST);
      for (const error of res.body.errors) {
        expect(Object.keys(invalidParams)).toContain(error.param);
        expect(error.msg).toBe("Invalid value");
      }
    });
  });

  describe("GET /users/:id", () => {
    test("should return 200 with valid user", async () => {
      const mockUser = factories.User.build();
      methods.findById.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, mockUser))
      );

      const res = await server.get(`/users/1`);
      expect(res.status).toEqual(200);
      expect(res.body.first_name).toBe(mockUser.first_name);
      expect(methods.findById).toHaveBeenCalledWith(1);
    });

    test("should return 404 if user is not found", async () => {
      methods.findById.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.NOT_FOUND))
      );

      const res = await server.get(`/users/-1`);
      expect(res.status).toEqual(404);
      expect(methods.findById).toHaveBeenCalledWith(-1);
    });

    test("should return 400 if user id is not valid", async () => {
      const res = await server.get(`/users/INVALID_ID`);
      expect(res.status).toEqual(400);
    });
  });

  describe("PATCH /users/set-password", () => {
    const kUrl = "/users/set-password";
    test("should return 200 with happy path", async () => {
      const params = {
        oldPassword: "oldpassword",
        newPassword: "newPassword",
      };

      methods.setPassword.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK))
      );

      const res = await server.patch(kUrl).send(params);
      expect(res.status).toEqual(Status.OK);
      expect(methods.setPassword).toHaveBeenCalledWith(
        1,
        params.oldPassword,
        params.newPassword
      );
    });

    test("should propagate errors", async () => {
      const params = {
        oldPassword: "oldpassword",
        newPassword: "newPassword",
      };

      methods.setPassword.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.FORBIDDEN))
      );
      const res = await server.patch(kUrl).send(params);
      expect(res.status).toEqual(403);
    });

    test("should return BAD_REQUEST with bad parameters", async () => {
      const invalidParams = {
        oldPassword: "a",
        newPassword: "a",
      };

      const res = await server.patch(kUrl).send(invalidParams);

      expect(res.status).toBe(Status.BAD_REQUEST);
      for (const error of res.body.errors) {
        expect(Object.keys(invalidParams)).toContain(error.param);
        expect(error.msg).toBe("Invalid value");
      }
    });
  });

  describe("DELETE /users/:id", () => {
    test("should return 200 with valid user id", async () => {
      methods.destroy.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK))
      );

      const res = await server.delete(`/users/1`);
      expect(res.status).toEqual(200);
      expect(methods.destroy).toHaveBeenCalledWith(1);
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
      expect(methods.destroy).toHaveBeenCalledWith(1);
    });
  });
});
