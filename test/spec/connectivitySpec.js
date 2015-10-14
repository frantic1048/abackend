var hippie = require('hippie');
var port = require('../../abackend.conf').serverPort;
var baseURL = 'http://localhost:' + port + '/api';

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
