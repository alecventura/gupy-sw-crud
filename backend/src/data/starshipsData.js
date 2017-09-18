let app = null;

const generateStarshipsInsertSQL = (starshipsJSON) => {
  const sql = starshipsJSON.reduce((string, item, index) => {
    const firstCharacter = index === 0 ? '' : ',';
    const urlSplited = item.url.trim().split('/');
    return `${string}${firstCharacter} (
      ${urlSplited[urlSplited.length - 2]}, 
      '${item.name}', 
      '${item.created}', 
      '${item.edited}',
      '${item.url}', 
      '${item.model}', 
      '${item.manufacturer}', 
      '${item.cost_in_credits}', 
      '${item.length}', 
      '${item.max_atmosphering_speed}', 
      '${item.crew}', 
      '${item.passengers}', 
      '${item.cargo_capacity}',
      '${item.consumables}',
      '${item.hyperdrive_rating}',
      '${item.MGLT}',
      '${item.starship_class}')`;
  }, 'INSERT INTO Starships (id, name, created, edited, url, model, '
    + 'manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, '
    + 'passengers, cargo_capacity, consumables, hyperdrive_rating, MGLT, starship_class) VALUES ');
  return sql;
};

const generateStarshipsPeopleInsertSQL = (starshipsJSON) => {
  let sql = 'INSERT INTO Starships_People (starships_id, people_id) VALUES ';
  let firstValue = true;
  starshipsJSON.forEach((item) => {
    const urlSplited = item.url.trim().split('/');
    const itemId = urlSplited[urlSplited.length - 2];
    item.pilots.forEach((people) => {
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

const generateStarshipsFilmsInsertSQL = (starshipsJSON) => {
  let sql = 'INSERT INTO Starships_Films (starships_id, films_id) VALUES ';
  let firstValue = true;
  starshipsJSON.forEach((item) => {
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

const insertStarships = (starshipsJSON) => {
  // Clear the tables before insert data on then
  const db = app.config.dbConnection.connSqlite();
  // Clear the table before insert data on it
  db.run('DELETE FROM Starships');
  db.run('DELETE FROM Starships_Films');
  db.run('DELETE FROM Starships_People');
  setTimeout(() => {
    db.run(generateStarshipsInsertSQL(starshipsJSON));
    db.run(generateStarshipsPeopleInsertSQL(starshipsJSON));
    db.run(generateStarshipsFilmsInsertSQL(starshipsJSON));
    db.close();
  }, 1000);
};

const getAll = (buildURLs, cb) => new Promise((resolve, reject) => {
  const db = app.config.dbConnection.connSqlite();
  return db.all(`
  select s.*,
  GROUP_CONCAT(DISTINCT ps.people_id) as pilots,
  GROUP_CONCAT(DISTINCT sf.films_id) as films
  from Starships s 
  left join Starships_People ps on ps.starships_id = s.id 
  left join Starships_Films sf on sf.starships_id = s.id
  group by s.id;
  `
    , [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(buildURLs(rows, cb));
      }
      db.close();
    });
}).catch(err => console.error(err));

module.exports = function StarshipsData(application) {
  app = application;
  return {
    insertStarships,
    getAll,
  };
};
