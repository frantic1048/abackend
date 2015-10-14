var hippie = require('hippie');
var port = require('../../abackend.conf').serverPort;
var baseURL = 'http://localhost:' + port + '/api';

describe('Registration:', function() {
  it('should register a new user', function(done) {
    hippie()
      .json()
      .send({
        name: 'Nico',
        password: 'noconi'
      })
      .base(baseURL)
      .post('/registration')
      .expectStatus(201)
      .expectValue('success', true)
      .end(function(err, res, body) {
        if (err) done.fail(err);
        else done();
      });
  });

  it('should reject register duplicate user', function(done) {
    hippie()
      .json()
      .send({
        name: 'Nico',
        password: 'noconi'
      })
      .base(baseURL)
      .post('/registration')
      .expectStatus(409)
      .expectValue('success', false)
      .end(function(err, res, body) {
        if (err) done.fail(err);
        else done();
      });
  });
});
