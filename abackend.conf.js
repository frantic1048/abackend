var config = {
  serverPort: 3999,
  databaseURI: 'mongodb://localhost:27017',
  logLevel: 'silly', // log levels: silly, info, warn, error
  secret: 'mahoushoujo!', // secret for JWT
  dev: true, // true: automatically drop database on server startup
};

module.exports = config;
