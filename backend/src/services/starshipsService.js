let app = null;

const getAll = cb => app.src.data.starshipsData.getAll(cb);

module.exports = function starshipsService(application) {
  app = application;
  return {
    getAll,
  };
};
