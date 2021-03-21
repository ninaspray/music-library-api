const express = require('express');
const app = express ();
app.use(express.json());
const artistControllers = require('./controllers/artists');

app.get('/test',(req, res) => {
    response.status(201).json('Hello World');
});

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

app.get('/artists/:id', artistControllers.getArtistById);

app.patch('/artists/:id', artistControllers.updateArtist);

app.delete('/artists/:id', artistControllers.deleteArtist);


module.exports = app;