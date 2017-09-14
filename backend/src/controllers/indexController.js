module.exports.index = function index(application, req, res) {
  res.send('Wellcome!');
};

module.exports.fillDatabase = function fillDatabase(application, req, res) {
  application.src.services.fillDatabaseService.fillDataBase(application);
  res.send('Database is been filled on background, should be done in a few seconds!');
};
