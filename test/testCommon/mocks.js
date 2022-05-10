const authMethods = require("../../src/middlewares/auth/methods");

/**
 * @param {Object} mockUserData
 */
function jwtValidUser(mockUserData = {}) {
  authMethods.findUser.mockImplementation(() => Promise.resolve(mockUserData));
}

/**
 */
function jwtInvalidUser() {
  authMethods.findUser.mockImplementation(() => Promise.resolve(null));
}

/**
 */
function validRolePermission() {
  authMethods.hasRolePermission.mockImplementation(() => Promise.resolve(true));
}

/**
 */
function invalidRolePermission() {
  authMethods.hasRolePermission.mockImplementation(() =>
    Promise.resolve(false)
  );
}

module.exports = {
  jwtValidUser,
  jwtInvalidUser,
  validRolePermission,
  invalidRolePermission,
};
