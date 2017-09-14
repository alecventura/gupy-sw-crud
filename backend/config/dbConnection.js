const sqlite3 = require('sqlite3').verbose();

const connSqlite = () => {
  console.log('Openning connections');
  // const db = new sqlite3.Database(':memory:');
  const db = new sqlite3.Database('./config/database.db');
  return db;
};

const createTables = (cb) => {
  const db = connSqlite();
  // console.log('Creating tables');
  db.run('CREATE TABLE Planets('
    + 'id INTEGER primary key,'
    + 'name TEXT,'
    + 'created TEXT,'
    + 'edited TEXT,'
    + 'url TEXT,'
    + 'rotation_period TEXT,'
    + 'orbital_period TEXT,'
    + 'diameter TEXT,'
    + 'climate TEXT,'
    + 'gravity TEXT,'
    + 'surface_water TEXT,'
    + 'population TEXT,'
    + 'terrain TEXT)');

  db.run('CREATE TABLE Starships('
    + 'id INTEGER primary key,'
    + 'name TEXT,'
    + 'created TEXT,'
    + 'edited TEXT,'
    + 'url TEXT,'
    + 'model TEXT,'
    + 'manufacturer TEXT,'
    + 'cost_in_credits TEXT,'
    + 'length TEXT,'
    + 'max_atmosphering_speed TEXT,'
    + 'crew TEXT,'
    + 'passengers TEXT,'
    + 'cargo_capacity TEXT,'
    + 'consumables TEXT,'
    + 'hyperdrive_rating TEXT,'
    + 'MGLT TEXT,'
    + 'starship_class TEXT)');

  db.run('CREATE TABLE Vehicles('
    + 'id INTEGER primary key,'
    + 'name TEXT,'
    + 'created TEXT,'
    + 'edited TEXT,'
    + 'url TEXT,'
    + 'model TEXT,'
    + 'manufacturer TEXT,'
    + 'cost_in_credits TEXT,'
    + 'length TEXT,'
    + 'max_atmosphering_speed TEXT,'
    + 'crew TEXT,'
    + 'passengers TEXT,'
    + 'cargo_capacity TEXT,'
    + 'consumables TEXT,'
    + 'vehicle_class TEXT)');

  db.run('CREATE TABLE People('
    + 'id INTEGER primary key,'
    + 'name TEXT,'
    + 'created TEXT,'
    + 'edited TEXT,'
    + 'url TEXT,'
    + 'height TEXT,'
    + 'mass TEXT,'
    + 'hair_color TEXT,'
    + 'skin_color TEXT,'
    + 'eye_color TEXT,'
    + 'birth_year TEXT,'
    + 'gender TEXT,'
    + 'homeworld INTEGER,'
    + 'consumables TEXT,'
    + 'vehicle_class TEXT)');


  db.run('CREATE TABLE Films('
    + 'id INTEGER primary key,'
    + 'title TEXT,'
    + 'created TEXT,'
    + 'edited TEXT,'
    + 'url TEXT,'
    + 'episode_id TEXT,'
    + 'opening_crawl TEXT,'
    + 'director TEXT,'
    + 'producer TEXT,'
    + 'release_date TEXT)');

  db.run('CREATE TABLE Species('
  + 'id INTEGER primary key,'
  + 'name TEXT,'
  + 'created TEXT,'
  + 'edited TEXT,'
  + 'url TEXT,'
  + 'classification TEXT,'
  + 'designation TEXT,'
  + 'hair_color TEXT,'
  + 'skin_color TEXT,'
  + 'eye_color TEXT,'
  + 'average_height TEXT,'
  + 'average_lifespan TEXT,'
  + 'homeworld INTEGER,'
  + 'language TEXT)');

  db.run('CREATE TABLE Planets_People(planets_id INTEGER, people_id INTEGER)');
  db.run('CREATE TABLE Planets_Films(planets_id INTEGER, films_id INTEGER)');
  db.run('CREATE TABLE Starships_Films(starships_id INTEGER, films_id INTEGER)');
  db.run('CREATE TABLE Starships_People(starships_id INTEGER, people_id INTEGER)');
  db.run('CREATE TABLE Vehicles_Films(vehicles_id INTEGER, films_id INTEGER)');
  db.run('CREATE TABLE Vehicles_People(vehicles_id INTEGER, people_id INTEGER)');
  db.run('CREATE TABLE People_Films(people_id INTEGER, films_id INTEGER)');
  db.run('CREATE TABLE People_Species(people_id INTEGER, species_id INTEGER)');
  db.run('CREATE TABLE Species_Films(species_id INTEGER, films_id INTEGER)');

  // console.log('Openning connections');
  db.close();
  if (cb) {
    cb();
  }
};


module.exports = { connSqlite, createTables };
