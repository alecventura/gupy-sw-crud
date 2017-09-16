let app = null;

const getAll = cb => app.src.data.speciesData.getAll(cb);

module.exports = function speciesService(application) {
  app = application;
  return {
    getAll,
  };
};
