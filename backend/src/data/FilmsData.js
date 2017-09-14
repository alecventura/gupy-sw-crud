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
  const db = app.config.dbConnection.connSqlite();
  db.run('DELETE FROM Films');
  setTimeout(() => {
    db.run(generateFilmsInsertSQL(filmsJSON));
    db.close();
  }, 1000);
};

const getAll = cb => new Promise((resolve, reject) => {
  const db = app.config.dbConnection.connSqlite();
  return db.all('SELECT * FROM Films', [], (err, rows) => {
    if (err) {
      reject(err);
    } else {
      resolve(cb(rows));
    }
    db.close();
  });
}).catch(err => console.error(err));

module.exports = function FilmsData(application) {
  app = application;
  return {
    insertFilms,
    getAll,
  };
};
