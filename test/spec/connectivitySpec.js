var frisby = require('frisby');
var port = require('../../abackend.conf').serverPort;

describe('connectivity', function() {
  frisby.create('GET /api/')
    .get('http://localhost:' + port + '/api/', {})
    .expectStatus(200)
    .toss();
});

describe('connectivity', function() {
  frisby.create('GET /api/')
    .get('http://localhost:' + port + '/api/', {})
    .expectStatus(200)
    .toss();
});

describe('connectivity', function() {
  frisby.create('GET /api/authenticate')
    .get('http://localhost:' + port + '/api/authenticate', {})
    .expectStatus(200)
    .toss();
});

describe('connectivity', function() {
  frisby.create('GET /api/users')
    .get('http://localhost:' + port + '/api/users', {})
    .expectStatus(200)
    .toss();
});

describe('connectivity', function() {
  frisby.create('GET /setup')
    .get('http://localhost:' + port + '/setup', {})
    .expectStatus(200)
    .expectJSON('0', {
      success: true
    })
    .toss();
});
