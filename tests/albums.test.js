const { expect } = require('chai');
const request = require('supertest');
const { response } = require('../src/app');
const app = require('../src/app');
const { Artist, Album } = require('../src/models');

describe('/albums', () => {
  let artist;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(201);

          Album.findByPk(res.body.id, { raw: true }).then((album) => {
            expect(album.name).to.equal('InnerSpeaker');
            expect(album.year).to.equal(2010);
            expect(album.artistId).to.equal(artist.id);
            done();
          }).catch(error => done(error));
        }).catch(error => done(error));
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      request(app)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.findAll().then((albums) => {
            expect(albums.length).to.equal(0);
            done();
          }).catch(error => done(error));
        }).catch(error => done(error));
    });
  });



  describe('Albums in the database', () => {
    let albums;
    beforeEach((done) => {
        Promise.all([
            Album.create({ name: "InnerSpeaker", year: 2001, artistId: artist.id }),
            Album.create({ name: "Lonerism", year: 2002, artistId: artist.id }),
            Album.create({ name: "Currents", year: 2003, artistId: artist.id }),
        ]).then((documents) => {
            albums = documents;
            //console.log("Lonerism" instanceof Album);
            done();
        }).catch(error => done(error));
    });

    
    describe('GET /albums', () => {
      it('gets all albums', (done) => {
          request(app)
              .get('/albums')
              .then((response) => {
                //console.log(response.toJSON());
                  expect(response.status).to.equal(201);
                  expect(response.body.length).to.equal(3);
                  response.body.forEach((album) => {
                       const expected = albums.find((a) => a.id === album.id);
                       expect(album.name).to.equal(expected.name);
                       expect(album.year).to.equal(expected.year);
                       expect(album.artistId).to.equal(expected.artistId);
                  });
                  done();
              }).catch(error => done(error));
      });

      describe('GET /albums/:albumId', () => {
        it('gets album record by id', (done) => {
          const album = albums[0];
          request(app)
            .get(`/albums/${album.id}`)
            .then((response) => {
              expect(response.status).to.equal(200);
              expect(response.body.name).to.equal(album.name);
              expect(response.body.year).to.equal(album.year);
              done();
            }).catch(error => done(error));
        });
        it('returns a 404 if the album does not exist', (done) => {
          request(app)
            .get('/albums/12345')
            .then((response) => {
              expect(response.status).to.equal(404);
              expect(response.body.error).to.equal('The album could not be found.');
              done();
            }).catch(error => done(error));
        });


        describe('PATCH /albums/:id', () => {
          it('updates album name by id', (done) => {
            const album = albums[0]
             request(app)
                .patch(`/albums/${album.id}`)
                .send({ name: "The Slow Rush" })
                .then(response => {
                   expect(response.status).to.equal(200)
                   Album.findByPk(album.id, { raw: true }).then(updatedAlbum => {
                      expect(updatedAlbum.name).to.equal("The Slow Rush")
                      done()
                   }).catch(error => done(error))
                })
          })
  
          it('updates album year by id', (done) => {
            const album = albums[0]
            request(app)
            .patch(`/albums/${album.id}`)
            .send({ year: 2011 })
            .then(response => {
              expect(response.status).to.equal(200)
              Album.findByPk(album.id,  { raw: true }).then(updatedAlbum => {
                expect(updatedAlbum.year).to.equal(2011)
                done()
              }).catch(error => done(error))
            })
          });


          describe('DELETE /albums/:albumId', () => {
            xit('deletes album record by album id', (done) => {
                const album = albums[0];
                request(app)
                    .delete(`/albums/${album.id}`)
                    .then((response) => {
                        expect(response.status).to.equal(204);
                        Album.findByPk(album.id, { raw: true }).then((updatedAlbum) => {
                            expect(updatedAlbum).to.equal(null);
                            done();
                        }).catch(error => done(error));
                    }).catch(error => done(error));
            });

            xit('returns a 404 if the album does not exist', (done) => {
                request(app)
                    .delete('/albums/12345')
                    .then((response) => {
                        expect(response.status).to.equal(404);
                        expect(response.body.error).to.equal('The album could not be found.');
                        done();
                    }).catch(error => done(error));
            });
        });

        // describe('DELETE /albums/:albumId', () => {
        //   xit('deletes an album by id', (done) => {
        //     const album = albums[0];
        //     request(app)
        //       .delete(`/albums/${album.id}`)
        //       .then((res) => {
        //         expect(res.status).to.equal(204);
        //         Album.findByPk(album.id, { raw: true }).then((deletedAlbum) => {
        //           expect(deletedAlbum).to.equal(null);
        //           done();
        //         });
        //       });
        //   });
    
        //   xit('returns a 404 if the album does not exist', (done) => {
        //     request(app)
        //       .delete('/albums/12345')
        //       .then((res) => {
        //         expect(res.status).to.equal(404);
        //         expect(res.body.error).to.equal('The album could not be found.');
        //         done();
        //       });
        //   });
          // describe('DELETE /albums/:albumId', () => {
          //   xit('deletes album record by id', (done) => {
          //      const album = albums[0]
          //      request(app)
          //         .delete(`/albums/${album.id}`)
          //         .then(response => {
          //            expect(response.status).to.equal(204)
          //            Album.findByPk(album.id, { raw: true }).then(deletedAlbum => {
          //               expect(deletedAlbum).to.equal(null)
          //               done()
          //            })
          //         })
          //         .catch(error => done(error))
          //   })


      });
  });});});});