const express = require('express');
const app = express ();
app.use(express.json());
const artistControllers = require('./controllers/artists');
const albumControllers = require('./controllers/albums');
const album = require('./models/albums');


app.get('/test',(req, res) => {
    response.status(201).json('Hello World');
});

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

app.get('/artists/:id', artistControllers.getArtistById);

app.patch('/artists/:id', artistControllers.updateArtist);

app.delete('/artists/:id', artistControllers.deleteArtist);






app.get('/albums', albumControllers.getAlbum);

app.post('/artists/:artistId/albums', albumControllers.create);

app.patch('/artists/:artistId/albums', albumControllers.updateAlbum);

// app.get('/artists/:artistId/albums', artistControllers.getAlbumById);
 
// app.get('/albums/:albumId', albumControllers.getAlbumById)



module.exports = app;