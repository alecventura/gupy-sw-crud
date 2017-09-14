module.exports.index = function (application, req, res) {
  // const connection = application.config.dbConnection;
  // const UsersData = new application.src.data.UsersData(connection);
  // UsersData.insert({ user: 'Alec', name: 'test' });
  application.src.services.fillDatabaseService.fillDataBase(application);

  res.send('TODO');
};
