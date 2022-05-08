const Status = require("../../../src/common/helpers/status");
const server = require("../../testCommon/testServer").getTestServer();
const methods = require("../../../src/api/methods/users");
const factories = require("../../testCommon/database/factories");
const mocks = require("../../testCommon/mocks");
const testUtils = require("../../testCommon/utils");

jest.mock("../../../src/api/methods/users");
jest.mock("../../../src/middlewares/auth/methods"); // Required so mock functions work

describe("Users Endpoints", () => {
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
    const request = (id, addJwt = true) => {
      const req = server.get(`${kUrl}/${id}`);

      if (addJwt) {
        return testUtils.authorizeJwt(req, id);
      }

      return req;
    };

    test("should return 200 with valid user", async () => {
      const mockUser = factories.User.build();
      methods.findById.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.OK, mockUser))
      );

      mocks.jwtValidUser(mockUser);
      mocks.validRolePermission();

      const res = await request(1);
      expect(res.status).toEqual(200);
      expect(res.body.first_name).toBe(mockUser.first_name);
      expect(methods.findById).toHaveBeenCalledWith(1);
    });

    test("should return NOT_FOUND if user is not found", async () => {
      const mockUser = factories.User.build();
      methods.findById.mockImplementationOnce(() =>
        Promise.resolve(new Status(Status.NOT_FOUND))
      );
      mocks.jwtValidUser(mockUser);
      mocks.validRolePermission();

      const res = await request(-1);
      expect(res.status).toEqual(Status.NOT_FOUND);
      expect(methods.findById).toHaveBeenCalledWith(-1);
    });

    test("should return BAD_REQUEST if user id is not valid", async () => {
      const res = await request("INVALID_ID");
      expect(res.status).toEqual(Status.BAD_REQUEST);
    });

    test("should return UNATHORIZED if requesting user is not valid", async () => {
      mocks.jwtInvalidUser();
      const res = await request(1);

      expect(res.status).toEqual(Status.UNAUTHORIZED);
    });

    test("should return UNATHORIZED if requesting role is not allowed", async () => {
      const mockUser = factories.User.build();
      mocks.jwtValidUser(mockUser);
      mocks.invalidRolePermission();
      const res = await request(1);

      expect(res.status).toEqual(Status.UNAUTHORIZED);
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
