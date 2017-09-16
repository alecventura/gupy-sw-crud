let app = null;

const getAll = cb => app.src.data.planetsData.getAll(cb);

module.exports = function planetsService(application) {
  app = application;
  return {
    getAll,
  };
};
