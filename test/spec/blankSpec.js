var frisby = require('frisby');
var port = require('../../abackend.conf.json').server_port;

describe('blank GET /', function() {
  frisby.create('GET /')
    .get('http://localhost:' + port)
    .expectStatus(200)
    .expectBodyContains('yahalo! GET!')
    .toss();
});

describe('blank GET /api/', function() {
  frisby.create('GET /api/')
    .post('http://localhost:' + port, {})
    .expectStatus(200)
    .toss();
});
