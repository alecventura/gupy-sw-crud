let app = null;

const buildURLs = (data, cb) => {
  data.forEach((item, i, dataArray) => {

    if (item.films && item.films.length > 0) {
      item.films = item.films.split(',');
      item.films.forEach((subItem, index, array) => {
        array[index] = `${app.config.constants.SWAPI_URL}films/${subItem}`;
      });
      item.films = item.films.join(' - ');
    }

    if (item.starships && item.starships.length > 0) {
      item.starships = item.starships.split(',');
      item.starships.forEach((subItem, index, array) => {
        array[index] = `${app.config.constants.SWAPI_URL}starships/${subItem}`;
      });
      item.starships = item.starships.join(' - ');
    }

    if (item.vehicles && item.vehicles.length > 0) {
      item.vehicles = item.vehicles.split(',');
      item.vehicles.forEach((subItem, index, array) => {
        array[index] = `${app.config.constants.SWAPI_URL}vehicles/${subItem}`;
      });
      item.vehicles = item.vehicles.join(' - ');
    }

    if (item.species && item.species.length > 0) {
      item.species = item.species.split(',');
      item.species.forEach((subItem, index, array) => {
        array[index] = `${app.config.constants.SWAPI_URL}species/${subItem}`;
      });
      item.species = item.species.join(' - ');
    }

    dataArray[i] = item;
    return item;
  });
  return cb(data);
};

const getAll = cb => app.src.data.peopleData.getAll(buildURLs, cb);

module.exports = function peopleService(application) {
  app = application;
  return {
    getAll,
  };
};
