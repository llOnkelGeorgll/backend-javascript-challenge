//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

/*
  * Test the image search
  */
  describe('send image search request', () => {
      it('it should retrieve a list of flickr image urls', (done) => {
        chai.request(server)
            .get('/images?query=apples')
            .end((err, res) => {
                res.body.should.be.a('array');

              done();
            });
      });
  });
