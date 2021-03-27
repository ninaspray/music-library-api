const { request } = require('express');
const { Artist } = require('../models');

exports.create = (request, response) => {
    Artist.create(request.body).then(artist => response.status(201).json(artist));
  };

exports.list = (request, response) => {
    Artist.findAll()
    .then(artists => {
    response.status(200)
    .json(artists);
    });
  };

exports.getArtistById = (request, response) => {
    const { id } = request.params;
    Artist.findByPk(id).then(artist => {
      if (!artist) {
        response.status(404).json({ error: 'The artist could not be found.' });
      } else {
        response.status(200).json(artist);
        }    
    });};

  exports.updateArtist = (request, response) => {
      const { id } = request.params;
      Artist.update(request.body, { where: { id } }).then(([rowsUpdated]) => {
        if (!rowsUpdated) {
          response.status(404).json({ error: 'The artist could not be found.' });
        } else {
          response.status(200).json(rowsUpdated);
        }
      });
    };
    exports.deleteArtist = (request, response) => {
      const { id } = request.params;
      Artist.destroy( { where: { id } }).then((idDeleted) => {
          if (!idDeleted) {
              response.status(404).json({ error: 'The artist could not be found.' });
          } else {
              response.status(204).json(idDeleted);
          };
      });
  };
