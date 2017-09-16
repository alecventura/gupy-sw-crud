let app = null;

const buildURLs = (data, cb) => {
  data.forEach((item, i, dataArray) => {

    if (item.characters && item.characters.length > 0) {
      item.characters = item.characters.split(',');
      item.characters.forEach((subItem, index, array) => {
        array[index] = `${app.config.constants.SWAPI_URL}people/${subItem}`;
      });
      item.characters = item.characters.join(' - ');
    }
    
    if (item.planets && item.planets.length > 0) {
      item.planets = item.planets.split(',');
      item.planets.forEach((subItem, index, array) => {
        array[index] = `${app.config.constants.SWAPI_URL}planets/${subItem}`;
      });
      item.planets = item.planets.join(' - ');
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

const getAll = cb => app.src.data.filmsData.getAll(buildURLs, cb);

module.exports = function filmsService(application) {
  app = application;
  return {
    getAll,
  };
};
