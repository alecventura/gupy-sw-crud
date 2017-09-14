module.exports = function (application) {
  application.get('/', (req, res) => {
    application.src.controllers.indexController.index(application, req, res);
  });

  application.get('/fillDatabase', (req, res) => {
    application.src.controllers.indexController.fillDatabase(application, req, res);
  });
};
