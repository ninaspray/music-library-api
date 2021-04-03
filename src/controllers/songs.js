
// exports.createSong = (request, response) => {
//     const { albumId } = request.params;
//     const { artistId } = request.params.ArtistModel
 
//         Album.findByPk(albumId).then((album) => {
//           if (!album) {
//             res.status(404).json({ error: 'The album could not be found.' });
//           } else {
//             const songData = {
//               name: req.body.name,
//               albumId: album.id,
//               artistId,
//             };
//             Song.create(songData).then((song) => {
//               res.status(201).json(song);
//             });
//           }
//         });
//       };

const { Artist, Album, Song } = require('../models')
const { request } = require('express');

exports.createSong = (req, res) => {
    Album.findByPk(req.params.albumId).then(album => {
        if (!album) {
            res.status(404).json({ error: "The album could not be found." });
        } else {
            req.body.albumId = parseInt(req.params.albumId);
            req.body.artistId = album.artistId;
            Song.create(req.body)
                .then(song => res.status(201)
                .json(song));
        }
    });
    }; 