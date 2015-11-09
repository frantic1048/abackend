/* eslint-env node, jasmine */
/* eslint-disable no-var, prefer-const, func-names */
/* eslint-disable ecmaFeatures */

var config = {
  serverPort: 3999,
  databaseURI: 'mongodb://localhost:27017',
  logLevel: Infinity, // log levels: silly, info, warn, error, Infinity(no log)
  secret: 'mahoushoujo!', // secret for JWT
  dev: true, // true: automatically drop database on server startup
};

module.exports = config;
