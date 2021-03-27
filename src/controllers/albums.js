const { request } = require('express');
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
exports.getAlbumById = (request, response) => {
    Album.findByPk(request.params.albumId)
         .then(albumDocument => {
         if (!albumDocument) response.status(404).json({ error: "The album could not be found." });
         else response.status(201).json(albumDocument);
        })
    };

exports.getAlbum = (_, response) => {
        Album.findAll()
        .then(albums => 
        response.status(201)
        .json(albums));
};

// exports.getAlbum = (request, response) => {
//     Album.findByPk(request.params.getAlbum)
//     .then(albumDocument => {
//         console.log(albumDocument);
//     if (!albumDocument) response.status(404).json({ error: "The albums could not be found." });
//     else response.status(201).json(albumDocument);
//     })
//     };









// exports.getAlbumByArtistId = (request, response) => {
//     const { id } = request.params;
//     artist.findByPk(id)
//     .then(artist => {
//     if (!artist) {response.status(404).json({ error: 'The artist could not be found.' });
//     } else { response.status(200).json(artist);
//     };});}


//       } else {
//         Album.findAll({ where: { id } }).then(albums => response.status(200)
//         .json(albums));
// }



// exports.getAlbums = (request, response) => {
//     Album.findAll()
//         .then(albums => response.status(200)
//         .json(albums));
// };
  
// exports.getAlbumsbyArtistId = (request, response) => {
//   const { id } = request.params;
//    Artist.findByPk(id).then(artist => {
//    if (!artist) {
//    response.status(404).json({ error: 'The artist could not be found.' });
//    } else {
//      response.status(200).json(artist);
//         }
// });};



//   exports.getAlbums = (request, response) => {
//     const { id } = request.params;
//     Artist.findByPk(id).then(artist => {
//       if (!artist) {
//         response.status(404).json({ error: 'The artist could not be found.' });
//       } else {
//         response.status(200).json(artist);
//         }
//     });};

//     exports.list = (request, response) => {
//         Album.findAll()
//         .then(albums => {
//         response.status(200)
//         .json(albums);
//         });
//       };

//     //   exports.updateAlbum = (request, response) => {
//     //     const { id } = request.params;
//     //     Artist.update(request.body, { where: { id } }).then(([rowsUpdated]) => {
//     //       if (id === 0) {
//     //         response.status(404).json({ error: 'The album could not be found.' });
//     //       } else {
//     //         response.status(200).json(rowsUpdated);
//     //       }
//     //     });
//     //   };


// exports.updateAlbum = (request, response) => {
//     const { id } = request.params;
//     Artist.findByPk(id).then(artist => {
//       if (!artist) {
//         response.status(404).json({ error: 'The artist could not be found.' });
//       } else {
//         response.status(200).json(artist);