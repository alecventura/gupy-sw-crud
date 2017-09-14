let app = null;

const generatePlanetsInsertSQL = (planetsJSON) => {
  const sql = planetsJSON.reduce((string, item, index) => {
    const firstCharacter = index === 0 ? '' : ',';
    const urlSplited = item.url.trim().split('/');
    return `${string}${firstCharacter} (${urlSplited[urlSplited.length - 2]}, '${item.name}', '${item.created}', '${item.edited}',
      '${item.url}', '${item.rotation_period}', '${item.orbital_period}', '${item.diameter}', 
      '${item.climate}', '${item.gravity}', '${item.surface_water}', '${item.population}', '${item.terrain}')`;
  }, 'INSERT INTO Planets (id, name, created, edited, url, rotation_period, '
    + 'orbital_period, diameter, climate, gravity, surface_water, '
    + 'population, terrain) VALUES ');
  return sql;
};

const generatePlanetsPeopleInsertSQL = (planetsJSON) => {
  let sql = 'INSERT INTO Planets_People (planets_id, people_id) VALUES ';
  let firstValue = true;
  planetsJSON.forEach((item) => {
    const urlSplited = item.url.trim().split('/');
    const itemId = urlSplited[urlSplited.length - 2];
    item.residents.forEach((people) => {
      const firstCharacter = firstValue ? '' : ',';
      const peopleUrlSplited = people.trim().split('/');
      const peopleId = peopleUrlSplited[peopleUrlSplited.length - 2];
      sql = `${sql}${firstCharacter} 
      (${parseInt(itemId, 10)}, ${parseInt(peopleId, 10)})`;
      firstValue = false;
    });
  });
  return sql;
};

const generatePlanetsFilmsInsertSQL = (planetsJSON) => {
  let sql = 'INSERT INTO Planets_Films (planets_id, films_id) VALUES ';
  let firstValue = true;
  planetsJSON.forEach((item) => {
    const urlSplited = item.url.trim().split('/');
    const itemId = urlSplited[urlSplited.length - 2];
    item.films.forEach((film) => {
      const firstCharacter = firstValue ? '' : ',';
      const filmUrlSplited = film.trim().split('/');
      const filmId = filmUrlSplited[filmUrlSplited.length - 2];
      sql = `${sql}${firstCharacter} 
      (${itemId}, ${filmId})`;
      firstValue = false;
    });
  });
  return sql;
};

const insertPlanets = (planetsJSON) => {
  // Clear the tables before insert data on then
  const db = app.config.dbConnection.connSqlite();
  // Clear the table before insert data on it
  db.run('DELETE FROM Planets');
  db.run('DELETE FROM Planets_Films');
  db.run('DELETE FROM Planets_People');
  setTimeout(() => {
    db.run(generatePlanetsInsertSQL(planetsJSON));
    db.run(generatePlanetsPeopleInsertSQL(planetsJSON));
    db.run(generatePlanetsFilmsInsertSQL(planetsJSON));
    db.close();
  }, 1000);
};

const getAll = cb => new Promise((resolve, reject) => {
  const db = app.config.dbConnection.connSqlite();
  return db.all('SELECT * FROM Planets', [], (err, rows) => {
    if (err) {
      reject(err);
    } else {
      resolve(cb(rows));
    }
    db.close();
  });
}).catch(err => console.error(err));

module.exports = function PlanetsData(application) {
  app = application;
  return {
    insertPlanets,
    getAll,
  };
};
