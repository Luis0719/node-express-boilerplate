const buildSequelizeOptions = params => {
  const options = {};

  if (params.raw) {
    options.raw = true;
  }

  if (params.sortBy) {
    options.order = [[params.sortBy, params.sortOrder || 'ASC']];
  }

  if (params.limit) {
    options.limit = params.limit;
  }

  if (params.includeDeleted) {
    options.paranoid = false;
  }

  return options;
};

module.exports = {
  buildSequelizeOptions,
};
