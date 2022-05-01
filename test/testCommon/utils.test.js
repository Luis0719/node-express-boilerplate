const testUtils = require("./utils");

describe("urlWithQueryParams", () => {
  test("should add single param to url", () => {
    const url = "/som/url";
    const params = {
      key1: "value1",
    };

    const result = testUtils.urlWithQueryParams(url, params);
    expect(result).toBe(url + "?key1=value1");
  });

  test("should add query params to url", () => {
    const url = "/som/url";
    const params = {
      key1: "value1",
      key2: "value2",
    };

    const result = testUtils.urlWithQueryParams(url, params);
    expect(result).toBe(url + "?key1=value1&key2=value2");
  });

  test("should return url with no params", () => {
    const url = "/som/url";
    const params = {};

    const result = testUtils.urlWithQueryParams(url, params);
    expect(result).toBe(url);
  });
});
