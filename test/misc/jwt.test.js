const jwt = require("../../src/common/helpers/jwt");

describe("Helpers Jwt", () => {
  test("Sign and decode", async () => {
    const data = { id: 1 };
    const token = await jwt.sign(data);
    expect(token).not.toBeNull();

    const decoded = await jwt.verify(token);
    expect(decoded.data.id).toBe(data.id);
  });
});
