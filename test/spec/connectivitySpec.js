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
  frisby.create('GET /api/users')
    .get('http://localhost:' + port + '/api/users', {})
    .expectStatus(200)
    .toss();
});
