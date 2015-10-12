var config = {
  serverPort: 3999,
  secret: 'mahoushoujo!',
  databaseURI: 'mongodb://localhost:27017',
  logLevel: 'silly', // log levels: silly, info, warn, error
  dev: true, // true: automatically drop database on server startup
};

module.exports = config;
