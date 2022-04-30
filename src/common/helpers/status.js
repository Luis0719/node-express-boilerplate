const httpErrors = require("http-errors");

/*
 * Interface between service errors and http errors.
 */
class CanonicalStatus {
  // TYPES
  static OK = 200;
  static BAD_REQUEST = 400;
  static UNAUTHORIZED = 401;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;
  // End of TYPES

  static errors = {
    400: httpErrors.BadRequest,
    401: httpErrors.Unauthorized,
    403: httpErrors.Forbidden,
    404: httpErrors.NotFound,
  };
  /**
   * @param  {CanonicalStatus.Type} type
   * @param  {any} data if error, this is usually a message as string
   */
  constructor(type, data) {
    if (type != CanonicalStatus.OK && !CanonicalStatus.errors[type]) {
      throw Error("Invalid error type " + (type ? type : "" + type));
    }

    this.type = type;
    this.data = data;
  }

  ok() {
    return this.type === CanonicalStatus.OK;
  }

  getData() {
    return this.data;
  }

  getError() {
    const httpError = CanonicalStatus.errors[this.type];
    return new httpError(this.data);
  }
}

module.exports = CanonicalStatus;
