//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

/*
* Test the image search
*/
describe('send image search request', () => {
  it('it should retrieve a list of flickr image urls', (done) => {
    chai.request(server)
    .get('/images?query=apples')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('urls');
      res.body[0].urls[0].should.have.property('url');
      res.body[0].urls[0].should.have.property('width');
      res.body[0].urls[0].should.have.property('height');
      done();
    });
  });
});

/*
* Test empty user input
*/
describe('send image search request with empty searchPhrase', () => {
  it('it should return a promt that no search word was specified', (done) => {
    chai.request(server)
    .get('/images?query=')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('message')
      res.body.message.should.equal('no search word specified');
      done();
    });
  });
});
/*
* Test wrong route
*/
describe('send image search request with empty searchPhrase', () => {
  it('it should return a welcome message', (done) => {
    chai.request(server)
    .get('/bla')
    .end((err, res) => {
      res.should.have.status(200);
      res.text.should.equal('Welcome to flickr image search')
      done();
    });
  });
});
/*
* Test wrong user input
*/
describe('send image search request with typo in url', () => {
  it('it should return a promt how to use the api correctly', (done) => {
    chai.request(server)
    .get('/images?qury=apps')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('message');
      res.body.message.should.equal('usage: /images?query=yourSearchWordHere');
      done();
    });
  });
});
