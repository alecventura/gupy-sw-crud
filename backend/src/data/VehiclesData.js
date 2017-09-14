let app = null;

const generateVehiclesInsertSQL = (vehiclesJSON) => {
  const sql = vehiclesJSON.reduce((string, item, index) => {
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
      '${item.vehicle_class}')`;
  }, 'INSERT INTO Vehicles (id, name, created, edited, url, model, '
    + 'manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, '
    + 'passengers, cargo_capacity, consumables, vehicle_class) VALUES ');
  return sql;
};

const generateVehiclesPeopleInsertSQL = (vehiclesJSON) => {
  let sql = 'INSERT INTO Vehicles_People (vehicles_id, people_id) VALUES ';
  let firstValue = true;
  vehiclesJSON.forEach((item) => {
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

const generateVehiclesFilmsInsertSQL = (vehiclesJSON) => {
  let sql = 'INSERT INTO Vehicles_Films (vehicles_id, films_id) VALUES ';
  let firstValue = true;
  vehiclesJSON.forEach((item) => {
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

const insertVehicles = (vehiclesJSON) => {
  // Clear the tables before insert data on then
  const db = app.config.dbConnection.connSqlite();
  // Clear the table before insert data on it
  db.run('DELETE FROM Vehicles');
  db.run('DELETE FROM Vehicles_Films');
  db.run('DELETE FROM Vehicles_People');
  setTimeout(() => {
    db.run(generateVehiclesInsertSQL(vehiclesJSON));
    db.run(generateVehiclesPeopleInsertSQL(vehiclesJSON));
    db.run(generateVehiclesFilmsInsertSQL(vehiclesJSON));
    db.close();
  }, 1000);
};

module.exports = function VehiclesData(application) {
  app = application;
  return {
    insertVehicles,
  };
};
