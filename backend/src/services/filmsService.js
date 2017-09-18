let app = null;

const buildURLs = (data, cb) => {
  data.forEach((item, i, dataArray) => {
    app.src.services.utilsService.parseRelationURL(item, 'characters', 'people');
    app.src.services.utilsService.parseRelationURL(item, 'planets', 'planets');
    app.src.services.utilsService.parseRelationURL(item, 'starships', 'starships');
    app.src.services.utilsService.parseRelationURL(item, 'vehicles', 'vehicles');
    app.src.services.utilsService.parseRelationURL(item, 'species', 'species');

    dataArray[i] = item;
    return item;
  });
  return cb(data);
};

const getAll = cb => app.src.data.filmsData.getAll(buildURLs, cb);

module.exports = function filmsService(application) {
  app = application;
  return {
    getAll,
  };
};
