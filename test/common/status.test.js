const Status = require('../../src/common/helpers/status');

describe("Helpers Status", () => {
  test("OK status", () => {
    const data = {id:1};
    const status = new Status(Status.OK, data);
    expect(status.ok()).toBe(true);
    expect(status.getData()).toEqual(data);
  });

  test("NOT_FOUND status", () => {
    const status = new Status(Status.NOT_FOUND);
    expect(status.ok()).toBe(false);
    expect(status.getError().statusCode).toBe(Status.NOT_FOUND);
  });
});
