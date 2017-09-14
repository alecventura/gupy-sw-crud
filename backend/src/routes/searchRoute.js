module.exports = function searchRoute(application) {
  application.get('/films', (req, res) => {
    application.src.controllers.searchController.getFilms(application, req, res);
  });

  application.get('/people', (req, res) => {
    application.src.controllers.searchController.getPeople(application, req, res);
  });

  application.get('/planets', (req, res) => {
    application.src.controllers.searchController.getPlanets(application, req, res);
  });

  application.get('/species', (req, res) => {
    application.src.controllers.searchController.getSpecies(application, req, res);
  });

  application.get('/starships', (req, res) => {
    application.src.controllers.searchController.getStarships(application, req, res);
  });

  application.get('/vehicles', (req, res) => {
    application.src.controllers.searchController.getVehicles(application, req, res);
  });
};
