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

const getAll = (buildURLs, cb) => new Promise((resolve, reject) => {
  const db = app.config.dbConnection.connSqlite();
  return db.all(`
  select f.*, 
  GROUP_CONCAT(DISTINCT p.people_id) as characters,
  GROUP_CONCAT(DISTINCT pl.planets_id) as planets,
  GROUP_CONCAT(DISTINCT s.starships_id) as starships,
  GROUP_CONCAT(DISTINCT v.vehicles_id) as vehicles,
  GROUP_CONCAT(DISTINCT sp.species_id) as species
  from Films f 
  left join People_Films p on p.films_id = f.id 
  left join Planets_Films pl on pl.films_id = f.id 
  left join Vehicles_Films v on v.films_id = f.id 
  left join Starships_Films s on s.films_id = f.id 
  left join Species_Films sp on sp.films_id = f.id
  group by f.id;
  
  `, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(buildURLs(rows, cb));
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
