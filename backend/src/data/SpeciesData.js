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
      '${item.hair_color}', 
      '${item.skin_color}', 
      '${item.eye_color}', 
      '${item.average_height}', 
      '${item.average_lifespan}',
      ${urlHomeworld ? urlHomeworld[urlHomeworld.length - 2] : 0}, 
      '${item.language.replace(/'/g, "''")}')`;
  }, 'INSERT INTO Species (id, name, created, edited, url, classification, '
    + 'designation, hair_color, skin_color, eye_color, average_height, '
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

module.exports = function SpeciesData(application) {
  app = application;
  return {
    insertSpecies,
  };
};
