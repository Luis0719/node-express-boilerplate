/**
 * @param  {Promise} promise
 * @return {[err, any]} result
 */
async function to(promise) {
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    return [err, null];
  }
}

module.exports = {
  to,
};
