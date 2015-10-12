var frisby = require('frisby');
var port = require('../../abackend.conf').serverPort;

describe('Authentication', function() {
  frisby.create('regist a user')
    .post('http://localhost:' + port + '/api/registration', {
      name: 'Regis',
      password: 'sisosi'
    })
    .expectStatus(201)
    .expectJSON('args', {
      success: true
    })
    .toss();

  frisby.create('authenticate nonexistent username')
    .post('http://localhost:' + port + '/api/authentication', {
      name: 'Regis233',
      password: 'sisosi'
    })
    .expectStatus(401)
    .expectJSON('args', {
      success: false
    })
    .toss();

    frisby.create('authenticate with wrong password')
      .post('http://localhost:' + port + '/api/authentication', {
        name: 'Regis',
        password: 'sisosi2333'
      })
      .expectStatus(401)
      .expectJSON('args', {
        success: false
      })
      .toss();

    frisby.create('authenticate with right password and username')
      .post('http://localhost:' + port + '/api/authentication', {
        name: 'Regis',
        password: 'sisosi'
      })
      .expectStatus(200)
      .expectJSON('args', {
        success: true
      })
      .expectJSONTypes('args', {
        token: String
      })
      .toss();
});
