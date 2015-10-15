var hippie = require('hippie');
var port = require('../../abackend.conf').serverPort;
var baseURL = 'http://localhost:' + port + '/api';

describe('Authentication:', function() {
  it('should register a new user', function(done) {
    hippie()
      .json()
      .send({
        name: 'Auth',
        password: 'rightpass'
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

  it('should reject with nonexistent username', function(done) {
    hippie()
      .json()
      .send({
        name: 'utha',
        password: 'rightpass'
      })
      .base(baseURL)
      .post('/authentication')
      .expectStatus(401)
      .expectValue('success', false)
      .end(function(err, res, body) {
        if (err) done.fail(err);
        else done();
      });
    });

    it('should reject with wrong password', function(done) {
      hippie()
        .json()
        .send({
          name: 'Auth',
          password: 'wrong password'
        })
        .base(baseURL)
        .post('/authentication')
        .expectStatus(401)
        .expectValue('success', false)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else done();
        });
    });

    it('should get token with right auth data', function(done) {
      hippie()
        .json()
        .send({
          name: 'Auth',
          password: 'rightpass'
        })
        .base(baseURL)
        .post('/authentication')
        .expectStatus(200)
        .expectValue('success', true)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else {
            var token = body.token;
            expect(token).toEqual(jasmine.any(String));
            hippie()
              .json()
              .header('x-access-token', token)
              .base(baseURL)
              .get('/users')
              .expectStatus(200)
              .expectValue('success', true)
              .end(function(err, res, body) {
                if (err) done.fail(err);
                done();
              });
          }
        });
    });

    it('should reject with no token', function(done) {
      hippie()
        .json()
        .base(baseURL)
        .get('/users')
        .expectStatus(403)
        .expectValue('success', false)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else done();
        });
    });

    it('should reject with wrong token', function(done) {
      hippie()
        .json()
        .header('x-access-token', 'wrong token')
        .base(baseURL)
        .get('/users')
        .expectStatus(401)
        .expectValue('success', false)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else done();
        });
    });
});
