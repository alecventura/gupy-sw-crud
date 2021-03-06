module.exports.getFilms = function getFilms(application, req, res) {
  application.src.services.filmsService.getAll((result) => {
    res.send(result);
  });
};

module.exports.getPeople = function getPeople(application, req, res) {
  application.src.services.peopleService.getAll((result) => {
    res.send(result);
  });
};

module.exports.getPlanets = function getPlanets(application, req, res) {
  application.src.services.planetsService.getAll((result) => {
    res.send(result);
  });
};

module.exports.getSpecies = function getSpecies(application, req, res) {
  application.src.services.speciesService.getAll((result) => {
    res.send(result);
  });
};

module.exports.getStarships = function getStarships(application, req, res) {
  application.src.services.starshipsService.getAll((result) => {
    res.send(result);
  });
};

module.exports.getVehicles = function getVehicles(application, req, res) {
  application.src.services.vehiclesService.getAll((result) => {
    res.send(result);
  });
};
