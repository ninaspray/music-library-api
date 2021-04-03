const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/models');

describe('/songs', () => {
    let artist;
    let album;
  
    before(async () => {
      try {
        await Artist.sequelize.sync();
        await Album.sequelize.sync();
        await Song.sequelize.sync();
      } catch (err) {
        console.log(err);
      }
    });
  
    beforeEach(async () => {
      try {
        await Artist.destroy({ where: {} });
        await Album.destroy({ where: {} });
        await Song.destroy({ where: {} });
        artist = await Artist.create({
          name: 'Tame Impala',
          genre: 'Rock',
        });
        album = await Album.create({
          name: 'InnerSpeaker',
          year: 2010,
          artistId: artist.id,
        });
      } catch (err) {
        console.log(err);
      }
    });
  
    describe('POST /album/:albumId/song', () => {
      it('creates a new song under an album', (done) => {
        console.log(album)
        request(app)
          .post(`/album/${album.id}/song`)
          .send({
            artist: artist.id,
            name: 'Solitude Is Bliss'
          }).then((response) => {
            expect(response.status).to.equal(201);
            const songId = response.body.id;
            expect(response.body.id).to.equal(songId);
            expect(response.body.name).to.equal('Solitude Is Bliss');
            expect(response.body.artistId).to.equal(artist.id);
            expect(response.body.albumId).to.equal(album.id);

            done();
          }).catch(error => done(error));
      });
    })});