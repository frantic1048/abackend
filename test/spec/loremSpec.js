var frisby = require('frisby');
var port = require('../../abackend.conf.json').server_port;

describe('GET yahalo', function() {
  frisby.create('GET yahalo')
    .get('http://localhost:' + port)
    .expectStatus(200)
    .expectBodyContains('yahalo! GET!')
    .toss();
});

describe('POST yahalo', function() {
  frisby.create('GET yahalo')
    .post('http://localhost:' + port, {})
    .expectStatus(200)
    .toss();
});
