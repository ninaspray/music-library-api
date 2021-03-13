const express = require('express');
const app = express ();
app.use(express.json());

app.get('/test',(req, res) => {
    res.status(201).json('Hello World');
});


module.exports = app;