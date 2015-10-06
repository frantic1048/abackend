var frisby = require('frisby');
var port = '3999';

describe('GET yahalo', function() {
  frisby.create('GET yahalo')
    .get('http://localhost:' + port)
    .expectStatus(200)
    .toss();
});

describe('POST yahalo', function() {
  frisby.create('GET yahalo')
    .post('http://localhost:' + port, {})
    .expectStatus(200)
    .toss();
});
