const factories = require("../factories");
const rolePrefabs = require("./Roles");

let admin;
let counter = 1; // Used to prevent duplicated values. Add 1 every time it's used

/**
 * Create admin user
 */
async function getAdmin() {
  if (!admin) {
    const adminRole = await rolePrefabs.getAdminRole();

    admin = await factories.User.create({
      username: "admin" + counter++,
      roles: [adminRole.id],
    });
  }

  return Promise.resolve(admin);
}

/**
 * Create guest user
 * @param  {int[]} actions=[]
 */
async function createGuest(actions = []) {
  const guestRole = await rolePrefabs.createGuestRole(actions);
  return factories.User.create({
    username: "guest" + counter++,
    roles: [guestRole.id],
  });
}

module.exports = {
  createGuest,
  getAdmin,
};
