module.exports.index = function (application, req, res) {
  res.send('Wellcome!');
};

module.exports.fillDatabase = function (application, req, res) {
  application.src.services.fillDatabaseService.fillDataBase(application);
  res.send('Database is been filled on background, should be done in a few seconds!');
};
