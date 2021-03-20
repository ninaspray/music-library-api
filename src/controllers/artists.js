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