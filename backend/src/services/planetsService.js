let app = null;

const buildURLs = (data, cb) => {
  data.forEach((item, i, dataArray) => {
    app.src.services.utilsService.parseRelationURL(item, 'residents', 'people');
    app.src.services.utilsService.parseRelationURL(item, 'films', 'films');

    dataArray[i] = item;
    return item;
  });
  return cb(data);
};

const getAll = cb => app.src.data.planetsData.getAll(buildURLs, cb);

module.exports = function planetsService(application) {
  app = application;
  return {
    getAll,
  };
};
