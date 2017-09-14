const fetch = require('node-fetch');

const generatePlanetInsertSQL = (planetsJSON) => {
  return planetsJSON.reduce((string, item, index) => {
    const firstCharacter = index === 0 ? '' : ',';
    const itemSplited = item.url.trim().split('/');
    return `${string}${firstCharacter} ('${itemSplited[itemSplited.length - 2]}', '${item.name}', '${item.created}', '${item.edited}',
      '${item.url}', '${item.rotation_period}', '${item.orbital_period}', '${item.diameter}', 
      '${item.climate}', '${item.gravity}', '${item.surface_water}', '${item.population}', '${item.terrain}')`;
  }, 'INSERT INTO Planets (id, name, created, edited, url, rotation_period, '
    + 'orbital_period, diameter, climate, gravity, surface_water, '
    + 'population, terrain) VALUES ');
};

const insertPlanets = (url, array, application) => {
  fetch(url)
    .then(y => y.json())
    .then((result) => {
      if (result.next) {
        insertPlanets(result.next, array.concat(result.results), application);
      } else {
        const db = application.config.dbConnection.connSqlite();
        const sql = generatePlanetInsertSQL(array.concat(result.results));
        console.log(sql);
        db.run(sql);
        db.close();
      }
    })
    .catch(err => console.error(err));
};

const fillDataBase = (application) => {
  const apiUrl = 'https://swapi.co/api/';
  insertPlanets(`${apiUrl}planets`, [], application);

  // const urls = [
  //   `${apiUrl}planets`,
  //   `${apiUrl}starships`,
  //   `${apiUrl}vehicles`,
  //   `${apiUrl}people`,
  //   `${apiUrl}films`,
  //   `${apiUrl}species`,
  // ];
};

module.exports = { fillDataBase };
