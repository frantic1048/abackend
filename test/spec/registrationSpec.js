var frisby = require('frisby');
var port = require('../../abackend.conf').serverPort;

describe('Registration', function() {
  frisby.create('correct registration')
    .post('http://localhost:' + port + '/api/registration', {
      name: 'Nico',
      password: 'noconi'
    })
    .expectStatus(201)
    .expectJSON('args', {
      success: true
    })
    .toss();
    
  frisby.create('duplicated username')
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
