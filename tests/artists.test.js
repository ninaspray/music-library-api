const { expect } = require('chai');
const request = require('supertest');
const { Artist } = require('../src/models');
const app = require('../src/app');
const response = require('../src/app');

describe('/artists', () => {

    before(done => {
      Artist.sequelize
        .sync()
        .then(() => done())
        .catch(error => done(error));
    })
  
    beforeEach(done => {
      Artist.destroy({ where: {} })
        .then(() => done()).catch(error => done(error));
    })
})
    
describe('POST /artists', (done) => {
  it('creates a new artist in the database', () => {
    request(app).post('/artists').send({
        name: 'Tame Impala',
        genre: 'Rock',
        }).then(response => {
        expect(response.status).to.equal(201);
        done();
        }).catch(error => done(error));
        });
    });

describe('with artists in the database', () => {
  let artists;
  beforeEach((done) => {
  Promise.all([
    Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
    Artist.create({ name: 'Kylie Minogue', genre: 'Pop' }),
    Artist.create({ name: 'Dave Brubeck', genre: 'Jazz' }),
    ]).then((documents) => {
    artists = documents;
    done();
    });
    });
  
describe('GET /artists', () => {
  it('gets all artist records', (done) => {
  request(app)
  .get('/artists')
  .then((response) => {
  expect(response.status).to.equal(200);
  expect(response.body.length).to.equal(3);
     response.body.forEach((artist) => {
                  const expected = artists.find((a) => a.id === artist.id);
          expect(artist.name).to.equal(expected.name);
          expect(artist.genre).to.equal(expected.genre);
          });
          done();
          })
         .catch(error => done(error));
          });
        });
      });