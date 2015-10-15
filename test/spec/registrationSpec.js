var hippie = require('hippie');
var port = require('../../abackend.conf').serverPort;
var baseURL = 'http://localhost:' + port + '/api';

describe('Registration:', function() {
  it('should register a new user', function(done) {
    hippie()
      .json()
      .send({
        id: 'Nico',
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

  describe('Illegal userid', function() {
    it('should reject register duplicate user', function(done) {
      hippie()
        .json()
        .send({
          id: 'Nico',
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

    it('should reject register empty string', function(done) {
      hippie()
        .json()
        .send({
          id: '',
          password: 'noconi'
        })
        .base(baseURL)
        .post('/registration')
        .expectStatus(422)
        .expectValue('success', false)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else done();
        });
    });

    it('should reject register non [0-9a-zA-Z_]', function(done) {
      hippie()
        .json()
        .send({
          id: '!',
          password: 'noconi'
        })
        .base(baseURL)
        .post('/registration')
        .expectStatus(422)
        .expectValue('success', false)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else done();
        });
    });
  });
});
