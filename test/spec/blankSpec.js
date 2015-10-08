var frisby = require('frisby');
var port = require('../../abackend.conf').serverPort;

describe('blank GET /', function() {
  frisby.create('GET /')
    .get('http://localhost:' + port)
    .expectStatus(200)
    .expectBodyContains('yahalo! GET!')
    .toss();
});

describe('blank GET /api/', function() {
  frisby.create('GET /api/')
    .get('http://localhost:' + port + '/api/', {})
    .expectStatus(200)
    .toss();
});
