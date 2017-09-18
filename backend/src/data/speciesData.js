let app = null;

const generateSpeciesInsertSQL = (speciesJSON) => {
  const sql = speciesJSON.reduce((string, item, index) => {
    const firstCharacter = index === 0 ? '' : ',';
    const urlSplited = item.url.trim().split('/');
    const urlHomeworld = item.homeworld ? item.homeworld.trim().split('/') : null;
    return `${string}${firstCharacter} (
      ${urlSplited[urlSplited.length - 2]}, 
      '${item.name.replace(/'/g, "''")}', 
      '${item.created}', 
      '${item.edited}',
      '${item.url}', 
      '${item.classification.replace(/'/g, "''")}', 
      '${item.designation}', 
      '${item.hair_colors}', 
      '${item.skin_colors}', 
      '${item.eye_colors}', 
      '${item.average_height}', 
      '${item.average_lifespan}',
      ${urlHomeworld ? urlHomeworld[urlHomeworld.length - 2] : 0}, 
      '${item.language.replace(/'/g, "''")}')`;
  }, 'INSERT INTO Species (id, name, created, edited, url, classification, '
    + 'designation, hair_colors, skin_colors, eye_colors, average_height, '
    + 'average_lifespan, homeworld, language) VALUES ');
  return sql;
};

const generateSpeciesFilmsInsertSQL = (speciesJSON) => {
  let sql = 'INSERT INTO Species_Films (species_id, films_id) VALUES ';
  let firstValue = true;
  speciesJSON.forEach((item) => {
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

const insertSpecies = (speciesJSON) => {
  // Clear the tables before insert data on then
  const db = app.config.dbConnection.connSqlite();
  // Clear the table before insert data on it
  db.run('DELETE FROM Species');
  db.run('DELETE FROM Species_Films');
  setTimeout(() => {
    db.run(generateSpeciesInsertSQL(speciesJSON));
    db.run(generateSpeciesFilmsInsertSQL(speciesJSON));
    db.close();
  }, 1000);
};

const getAll = (buildURLs, cb) => new Promise((resolve, reject) => {
  const db = app.config.dbConnection.connSqlite();
  return db.all(`
  select s.*,
  GROUP_CONCAT(DISTINCT ps.people_id) as people,
  GROUP_CONCAT(DISTINCT sf.films_id) as films
  from Species s 
  left join People_Species ps on ps.species_id = s.id 
  left join Species_Films sf on sf.species_id = s.id
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

module.exports = function SpeciesData(application) {
  app = application;
  return {
    insertSpecies,
    getAll,
  };
};
