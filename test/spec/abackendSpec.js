var hippie = require('hippie');
var port = require('../../abackend.conf').serverPort;
var baseURL = 'http://localhost:' + port + '/api';

// Spec Assertion
var goodUser = {};

goodUser.id = 'Good';
goodUser.name = 'Good Good';
goodUser.password = 'Good Password';

// ======================
// Connect availability
// ======================
describe('Connect availability:', function() {
  it('should connect /api successfully', function(done) {
    hippie()
      .base(baseURL)
      .get('/')
      .expectStatus(200)
      .end(function(err, res, body) {
        if (err) done.fail(err);
        else done();
      });
  });
});

// ======================
// Registration
// ======================
describe('Registration:', function() {
  it('should register good user', function(done) {
    hippie()
      .json()
      .send({
        id: goodUser.id,
        name: goodUser.name,
        password: goodUser.password
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
    it('should reject register duplicate userid', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          name: goodUser.name,
          password: goodUser.password
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

// ======================
// Authentication
// ======================
describe('Authentication:', function() {
  it('should reject nonexistent userid', function(done) {
    hippie()
      .json()
      .send({
        id: 'nonexistent',
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

    it('should reject wrong password', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
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

    it('should reject empty token', function(done) {
      hippie()
        .json()
        .base(baseURL + '/users')
        .get('/' + goodUser.id)
        .expectStatus(403)
        .expectValue('success', false)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else done();
        });
    });

    it('should reject wrong token', function(done) {
      hippie()
        .json()
        .header('x-access-token', 'wrong token')
        .base(baseURL + '/users')
        .get('/' + goodUser.id)
        .expectStatus(401)
        .expectValue('success', false)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else done();
        });
    });

    describe('Protected API Guard', function() {
      it('should get token with good auth data', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password
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
              .get('/users/' + goodUser.id)
              .expectStatus(200)
              .expectValue('success', true)
              .end(function(err, res, body) {
                if (err) throw err;
                done();
              });
          }
        });
      });

      it('should reject bad userid-token pairing', function(done) {
        hippie()
          .json()
          .send({
            id: goodUser.id,
            password: goodUser.password
          })
          .base(baseURL)
          .post('/authentication')
          .expectStatus(200)
          .expectValue('success', true)
          .end(function(err, res, body) {
            if (err) done.fail(err);
            else {
              var token = body.token;
              hippie()
                .json()
                .header('x-access-token', token)
                .base(baseURL)
                .get('/users/' + 'nonono')
                .expectStatus(403)
                .expectValue('success', false)
                .end(function(err, res, body) {
                  if (err) done.fail(err);
                  done();
                });
            }
          });
      });
    });
});


// ======================
// Functionality
// ======================
describe('Functionality:', function() {
  describe('Notes API', function() {
    it('should successfully connect to /notes/', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password
        })
        .base(baseURL)
        .post('/authentication')
        .expectStatus(200)
        .expectValue('success', true)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else {
            var token = body.token;
            hippie()
              .json()
              .header('x-access-token', token)
              .base(baseURL)
              .get('/users/' + goodUser.id + '/notes/')
              .expectStatus(200)
              .expectValue('success', true)
              .end(function(err, res, body) {
                if (err) done.fail(err);
                done();
              });
          }
        });
    });

    it('should successfully connect to /notes/<any id>', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password
        })
        .base(baseURL)
        .post('/authentication')
        .expectStatus(200)
        .expectValue('success', true)
        .end(function(err, res, body) {
          if (err) done.fail(err);
          else {
            var token = body.token;
            hippie()
              .json()
              .header('x-access-token', token)
              .base(baseURL)
              .get('/users/' + goodUser.id + '/notes' + '/any_id')
              .expectStatus(200)
              .expectValue('success', true)
              .end(function(err, res, body) {
                if (err) done.fail(err);
                done();
              });
          }
        });
    });
  });
});