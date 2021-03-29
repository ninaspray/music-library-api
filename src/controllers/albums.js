const { request, response } = require('express');
const { Album } = require('../models');
const { Artist } = require('../models');
const albums = require('../models/albums');


exports.create = (request, response) => {
    const data = request.body
    data.artistId = request.params.artistId
    Artist.findByPk(request.params.artistId).then(artistDocument => {
        if (!artistDocument) response.status(404).json({ error: "The artist could not be found." })
        else Album.create(data).then(albumDocument => response.status(201).json(albumDocument))
    })
//         console.log(albumDocument.get())
//         response.status(201).json(albumDocument)}).catch(error => {
//         console.log(error)
//         response.status(404).json({ error: "The artist could not be found." })});
};


exports.getAlbum = (_, response) => {
        Album.findAll()
        .then(albums => 
        response.status(201)
        .json(albums));
};


exports.getAlbumById = (request, response) => {
    Album.findByPk(request.params.albumId)
         .then(albumDocument => {
         if (!albumDocument) response.status(404).json({ error: "The album could not be found." });
         else response.status(200).json(albumDocument);
        })
    };
 
    
exports.updateAlbum = (request, response) => {
    Album.update(request.body, { where: { id: request.params.albumId } })
    .then(rowsUpdated => {
     Album.findByPk(request.params.albumId)
    .then(requestedAlbum => {
    if(!rowsUpdated[0]){
            response.status(404).json({ error: "The album could not be found", requestedAlbum })
          } else {
            response.status(200).json({ updatedAlbum: requestedAlbum })
          }
        })
    });};

exports.deleteAlbum = (request, response) => {
  const { albumId } = request.params;
  Album.destroy({ where: { id: albumId }})
  .then(updatedAlbum => {
  if(!updatedAlbum) {
  return response.status(404).json({ error: 'The album could not be found' })
  } else {
  return response.status(204).json(updatedAlbum);
  }});};