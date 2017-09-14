const app = require('./config/server');
const bdConnection = require('./config/dbConnection');
const fs = require('fs');

const port = process.env.PORT || 3002;
const createDatabase = !fs.existsSync('./config/database.db');

const startServer = () => {
  app.listen(port, () => {
    console.log('Server initialized');
  });
};

if (createDatabase) {
  bdConnection.createTables(startServer);
} else {
  startServer();
}
