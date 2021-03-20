const express = require('express');
const app = express ();
app.use(express.json());
const artistControllers = require('./controllers/artists');

app.get('/test',(req, res) => {
    response.status(201).json('Hello World');
});

app.post('/artists', artistControllers.create);



module.exports = app;