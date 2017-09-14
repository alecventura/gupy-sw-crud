const fetch = require('node-fetch');

let app = null;

const insertData = (url, array, dataInsertCallbackFunction) => {
  fetch(url)
    .then(y => y.json())
    .then((result) => {
      if (result.next) {
        insertData(result.next, array.concat(result.results), dataInsertCallbackFunction);
      } else {
        dataInsertCallbackFunction(array.concat(result.results));
      }
    })
    .catch(err => console.error(err));
};

const fillDataBase = () => {
  const apiUrl = 'https://swapi.co/api/';
  insertData(`${apiUrl}films`, [], app.src.data.filmsData.insertFilms);
  insertData(`${apiUrl}people`, [], app.src.data.peopleData.insertPeople);
  insertData(`${apiUrl}planets`, [], app.src.data.planetsData.insertPlanets);
  insertData(`${apiUrl}species`, [], app.src.data.speciesData.insertSpecies);
  insertData(`${apiUrl}starships`, [], app.src.data.starshipsData.insertStarships);
  insertData(`${apiUrl}vehicles`, [], app.src.data.vehiclesData.insertVehicles);
};

module.exports = function PlanetsData(application) {
  app = application;
  return {
    fillDataBase,
  };
};
