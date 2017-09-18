let app = null;

const buildURLs = (data, cb) => {
  data.forEach((item, i, dataArray) => {
    app.src.services.utilsService.parseRelationURL(item, 'films', 'films');
    app.src.services.utilsService.parseRelationURL(item, 'starships', 'starships');
    app.src.services.utilsService.parseRelationURL(item, 'vehicles', 'vehicles');
    app.src.services.utilsService.parseRelationURL(item, 'species', 'species');

    dataArray[i] = item;
    return item;
  });
  return cb(data);
};

const getAll = cb => app.src.data.peopleData.getAll(buildURLs, cb);

module.exports = function peopleService(application) {
  app = application;
  return {
    getAll,
  };
};
