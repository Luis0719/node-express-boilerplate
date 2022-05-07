const Status = require("../../src/common/helpers/status");
const server = require("../testCommon/testServer").getTestServer();
const methods = require("../../src/api/methods/users");
const factories = require("../testCommon/database/factories");
jest.mock("../../src/api/methods/users");

describe("Users Endpoints", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    const kUrl = "/users";
    const request = () => {
      return server.get(kUrl);
    };

    test("should return 200 if ok", async () => {
      const mockUser = factories.User.build();
      methods.list.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, [mockUser]))
      );

      const res = await request(`/users`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].first_name).toBe(mockUser.first_name);
      expect(methods.list).toHaveBeenCalledWith({});
    });

    // TODO add query filters coverage
  });

  describe("POST /users/register", () => {
    const kUrl = "/users/register";
    const request = (params = {}) => {
      return server.post(kUrl).send(params);
    };

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

      const res = await request(mockUserOptions);

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

      const res = await request(mockUserOptions);

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

      const res = await request(params);

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

      const res = await request(invalidParams);

      expect(res.status).toBe(Status.BAD_REQUEST);
      for (const error of res.body.errors) {
        expect(Object.keys(invalidParams)).toContain(error.param);
        expect(error.msg).toBe("Invalid value");
      }
    });
  });

  describe("GET /users/find/:id", () => {
    const kUrl = "/users/find";
    const request = (id) => {
      return server.get(`${kUrl}/${id}`);
    };

    test("should return 200 with valid user", async () => {
      const mockUser = factories.User.build();
      methods.findById.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, mockUser))
      );

      const res = await request(1);
      expect(res.status).toEqual(200);
      expect(res.body.first_name).toBe(mockUser.first_name);
      expect(methods.findById).toHaveBeenCalledWith(1);
    });

    test("should return 404 if user is not found", async () => {
      methods.findById.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.NOT_FOUND))
      );

      const res = await request(-1);
      expect(res.status).toEqual(404);
      expect(methods.findById).toHaveBeenCalledWith(-1);
    });

    test("should return 400 if user id is not valid", async () => {
      const res = await request("INVALID_ID");
      expect(res.status).toEqual(400);
    });
  });

  describe("PATCH /users/update/set-password", () => {
    const kUrl = "/users/update/set-password";
    const request = (params = {}) => {
      return server.patch(kUrl).send(params);
    };

    test("should return 200 with happy path", async () => {
      const params = {
        oldPassword: "oldpassword",
        newPassword: "newPassword",
      };

      methods.setPassword.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK))
      );

      const res = await request(params);
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
      const res = await request(params);
      expect(res.status).toEqual(403);
    });

    test("should return BAD_REQUEST with bad parameters", async () => {
      const invalidParams = {
        oldPassword: "a",
        newPassword: "a",
      };

      const res = await request(invalidParams);

      expect(res.status).toBe(Status.BAD_REQUEST);
      for (const error of res.body.errors) {
        expect(Object.keys(invalidParams)).toContain(error.param);
        expect(error.msg).toBe("Invalid value");
      }
    });
  });

  describe("DELETE /users/delete/:id", () => {
    const kUrl = "/users/delete";
    const request = (id) => {
      return server.delete(`${kUrl}/${id}`);
    };

    test("should return 200 with valid user id", async () => {
      methods.destroy.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK))
      );

      const res = await request(1);
      expect(res.status).toEqual(200);
      expect(methods.destroy).toHaveBeenCalledWith(1);
    });

    test("should return 400 if user id is not valid", async () => {
      const res = await request("INVALID_ID");
      expect(res.status).toEqual(400);
    });

    test("should expose error", async () => {
      methods.destroy.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.FORBIDDEN))
      );
      const res = await request(1);
      expect(res.status).toEqual(403);
      expect(methods.destroy).toHaveBeenCalledWith(1);
    });
  });
});
