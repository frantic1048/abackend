/* eslint-env node, jasmine */
/* eslint-disable no-var, prefer-const, vars-on-top, func-names, no-unused-vars */
/* eslint-disable ecmaFeatures */

var hippie = require('hippie');
var logger = require('../../build/logger');
var port = require('../../abackend.conf').serverPort;
var baseURL = 'http://localhost:' + port + '/api';

// =====================
// Spec Assertion
// =====================
var goodUser = {};
goodUser.id = 'Good';
goodUser.name = 'Good Good';
goodUser.password = 'Good Password';

var goodUser2 = {};
goodUser2.id = 'Good2';
goodUser2.name = 'Good Good2';
goodUser2.password = 'Good Password2';
goodUser2.newPassword = 'Good New Password';

var goodNote = {};
goodNote.title = 'Good Note';
goodNote.date = new Date('2015-09-09Z09:00:00');
goodNote.id = 0;
goodNote.tags = ['Good Tag1', 'GTag2', 'GTag3'];
goodNote.body = 'Once upon a time, there was a good man...';

var goodNote2 = {};
goodNote2.title = 'Good Note 2';
goodNote2.date = new Date('2015-02-02Z00:02:22');
goodNote2.id = 1;
goodNote2.tags = ['Good2', ' GTag3'];
goodNote2.body = 'Twice upon a time, there was another good man...';

var badNote = {};
badNote.id = 99999;

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
        password: goodUser.password,
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

  it('should register another good user', function(done) {
    hippie()
      .json()
      .send({
        id: goodUser2.id,
        name: goodUser2.name,
        password: goodUser2.password,
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
          password: goodUser.password,
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
          password: 'noconi',
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
          password: 'noconi',
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

  describe('Change password', function() {
    it('should reject with bad password', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser2.id,
          password: goodUser2.password,
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
              .send({
                password: 'wrongggg',
              })
              .base(baseURL)
              .patch('/users/' + goodUser2.id)
              .expectStatus(401)
              .expectValue('success', false)
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });

    it('should accept with good old password', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser2.id,
          password: goodUser2.password,
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
              .send({
                password: goodUser2.password,
                newPassword: goodUser2.newPassword,
              })
              .base(baseURL)
              .patch('/users/' + goodUser2.id)
              .expectStatus(200)
              .expectValue('success', true)
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });
  });

  describe('Unregistration', function() {
    it('should reject req with bad password', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser2.id,
          password: goodUser2.newPassword,
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
              .send({
                password: 'wronggggg',
              })
              .base(baseURL)
              .del('/users/' + goodUser2.id)
              .expectStatus(401)
              .expectValue('success', false)
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });

    it('should accept req with good password', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser2.id,
          password: goodUser2.newPassword,
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
              .send({
                password: goodUser2.newPassword,
              })
              .base(baseURL)
              .del('/users/' + goodUser2.id)
              .expectStatus(204)
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
                done();
              });
          }
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
        password: 'rightpass',
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
        password: 'wrong password',
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
          password: goodUser.password,
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
              .end(function(_err, _res, _body) {
                if (_err) throw _err;
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
          password: goodUser.password,
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
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
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
          password: goodUser.password,
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
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });

    it('should successfully create a note', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password,
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
              .send(goodNote)
              .base(baseURL)
              .post('/users/' + goodUser.id + '/notes/' + goodNote.id)
              .expectStatus(201)
              .expectValue('success', true)
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });

    it('should successfully create another note', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password,
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
              .send(goodNote2)
              .base(baseURL)
              .post('/users/' + goodUser.id + '/notes/' + goodNote2.id)
              .expectStatus(201)
              .expectValue('success', true)
              .end(function(_err, _res, _body) {
                logger.info(res._body);
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });

    it('should reject create(POST) exist note', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password,
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
              .send(goodNote)
              .base(baseURL)
              .post('/users/' + goodUser.id + '/notes/' + goodNote.id)
              .expectStatus(409)
              .expectValue('success', false)
              .end(function(_err, _res, _body) {
                logger.info(res._body);
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });

    it('should return note list', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password,
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
              .end(function(_err, _res, _body) {
                expect(_body.noteList).toEqual(jasmine.arrayContaining([jasmine.any(Object)]));
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });

    it('should return a note', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password,
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
              .get('/users/' + goodUser.id + '/notes/' + goodNote.id)
              .expectStatus(200)
              .expectValue('success', true)
              .end(function(_err, _res, _body) {
                expect(_body.note).toEqual(jasmine.any(Object));
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });

    it('should reject nonexistent note req', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password,
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
              .get('/users/' + goodUser.id + '/notes/' + badNote.id)
              .expectStatus(404)
              .expectValue('success', false)
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });

    it('should update note body', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password,
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
              .send({
                body: goodNote2.body,
              })
              .patch('/users/' + goodUser.id + '/notes/' + goodNote.id)
              .expectStatus(200)
              .expectValue('success', true)
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
                hippie()
                  .json()
                  .header('x-access-token', token)
                  .base(baseURL)
                  .get('/users/' + goodUser.id + '/notes/' + goodNote.id)
                  .expectStatus(200)
                  .end(function(__err, __res, __body) {
                    if (__err) done.fail(__err);
                    expect(__body.note.body).toBe(goodNote2.body);
                    done();
                  });
              });
          }
        });
    });

    it('should delete a note', function(done) {
      hippie()
        .json()
        .send({
          id: goodUser.id,
          password: goodUser.password,
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
              .header('x-access-token', token)
              .base(baseURL)
              .del('/users/' + goodUser.id + '/notes/' + goodNote2.id)
              .expectStatus(204)
              .end(function(_err, _res, _body) {
                if (_err) done.fail(_err);
                done();
              });
          }
        });
    });
  });
});
