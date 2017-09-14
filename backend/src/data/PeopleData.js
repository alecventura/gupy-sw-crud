let app = null;

const generatePeopleInsertSQL = (peopleJSON) => {
  const sql = peopleJSON.reduce((string, item, index) => {
    const firstCharacter = index === 0 ? '' : ',';
    const urlSplited = item.url.trim().split('/');
    const urlHomeworld = item.homeworld ? item.homeworld.trim().split('/') : null;
    return `${string}${firstCharacter} (
      ${urlSplited[urlSplited.length - 2]}, 
      '${item.name.replace(/'/g, "''")}', 
      '${item.created}', 
      '${item.edited}',
      '${item.url}', 
      '${item.height}', 
      '${item.mass}', 
      '${item.hair_color}', 
      '${item.skin_color}', 
      '${item.eye_color}', 
      '${item.birth_year}', 
      '${item.gender}',
      ${urlHomeworld ? urlHomeworld[urlHomeworld.length - 2] : 0})`;
  }, 'INSERT INTO People (id, name, created, edited, url, height, '
    + 'mass, hair_color, skin_color, eye_color, birth_year, '
    + 'gender, homeworld) VALUES ');
  return sql;
};

const generatePeopleFilmsInsertSQL = (peopleJSON) => {
  let sql = 'INSERT INTO People_Films (people_id, films_id) VALUES ';
  let firstValue = true;
  peopleJSON.forEach((item) => {
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

const generatePeopleSpeciesInsertSQL = (peopleJSON) => {
  let sql = 'INSERT INTO People_Species (people_id, species_id) VALUES ';
  let firstValue = true;
  peopleJSON.forEach((item) => {
    const urlSplited = item.url.trim().split('/');
    const itemId = urlSplited[urlSplited.length - 2];
    item.species.forEach((specie) => {
      const firstCharacter = firstValue ? '' : ',';
      const specieUrlSplited = specie.trim().split('/');
      const specieId = specieUrlSplited[specieUrlSplited.length - 2];
      sql = `${sql}${firstCharacter} 
      (${itemId}, ${specieId})`;
      firstValue = false;
    });
  });
  return sql;
};

const insertPeople = (peopleJSON) => {
  // Clear the tables before insert data on then
  const db = app.config.dbConnection.connSqlite();
  // Clear the table before insert data on it
  db.run('DELETE FROM People');
  db.run('DELETE FROM People_Films');
  db.run('DELETE FROM People_Species');
  setTimeout(() => {
    db.run(generatePeopleInsertSQL(peopleJSON));
    db.run(generatePeopleFilmsInsertSQL(peopleJSON));
    db.run(generatePeopleSpeciesInsertSQL(peopleJSON));
    db.close();
  }, 1000);
};

module.exports = function PeopleData(application) {
  app = application;
  return {
    insertPeople,
  };
};
