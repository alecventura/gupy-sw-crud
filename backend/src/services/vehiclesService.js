let app = null;

const buildURLs = (data, cb) => {
  data.forEach((item, i, dataArray) => {
    app.src.services.utilsService.parseRelationURL(item, 'pilots', 'people');
    app.src.services.utilsService.parseRelationURL(item, 'films', 'films');

    dataArray[i] = item;
    return item;
  });
  return cb(data);
};

const getAll = cb => app.src.data.vehiclesData.getAll(buildURLs, cb);

module.exports = function vehiclesService(application) {
  app = application;
  return {
    getAll,
  };
};
