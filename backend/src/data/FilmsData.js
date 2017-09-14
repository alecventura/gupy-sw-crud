let app = null;

const generateFilmsInsertSQL = (filmsJSON) => {
  const sql = filmsJSON.reduce((string, item, index) => {
    const firstCharacter = index === 0 ? '' : ',';
    const urlSplited = item.url.trim().split('/');
    return `${string}${firstCharacter} (${urlSplited[urlSplited.length - 2]}, '${item.title}', '${item.created}', '${item.edited}',
      '${item.url}', '${item.episode_id}', '${item.opening_crawl.replace(/'/g, "''")}', '${item.director}', 
      '${item.producer}', '${item.release_date}')`;
  }, 'INSERT INTO Films (id, title, created, edited, url, episode_id, '
    + 'opening_crawl, director, producer, release_date) VALUES ');
  return sql;
};

const insertFilms = (filmsJSON) => {
  // Clear the tables before insert data on then
  const db = app.config.dbConnection.connSqlite();
  // Clear the table before insert data on it
  db.run('DELETE FROM Films');
  setTimeout(() => {
    db.run(generateFilmsInsertSQL(filmsJSON));
    db.close();
  }, 1000);
};

module.exports = function FilmsData(application) {
  app = application;
  return {
    insertFilms,
  };
};
