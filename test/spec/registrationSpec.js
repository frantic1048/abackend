var frisby = require('frisby');
var port = require('../../abackend.conf').serverPort;

describe('registration', function() {
  frisby.create('POST JSON to /api/registration')
    .post('http://localhost:' + port + '/api/registration', {
      name: 'Nico',
      password: 'noconi'
    })
    .expectStatus(201)
    .expectJSON('args', {
      success: true
    })
    .toss();
    frisby.create('POST JSON to /api/registration')
      .post('http://localhost:' + port + '/api/registration', {
        name: 'Nico',
        password: 'noconi'
      })
      .expectStatus(409)
      .expectJSON('args', {
        success: false
      })
      .toss();
});
