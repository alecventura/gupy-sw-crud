let app = null;

const getAll = cb => app.src.data.vehiclesData.getAll(cb);

module.exports = function vehiclesService(application) {
  app = application;
  return {
    getAll,
  };
};
