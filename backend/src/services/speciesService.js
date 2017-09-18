let app = null;

const buildURLs = (data, cb) => {
  data.forEach((item, i, dataArray) => {
    app.src.services.utilsService.parseRelationURL(item, 'people', 'people');
    app.src.services.utilsService.parseRelationURL(item, 'films', 'films');

    dataArray[i] = item;
    return item;
  });
  return cb(data);
};

const getAll = cb => app.src.data.speciesData.getAll(buildURLs, cb);

module.exports = function speciesService(application) {
  app = application;
  return {
    getAll,
  };
};
