const express = require('express');
const app = express ();
app.use(express.json());

app.get('/test',(_, req) => {
    req.status(201).json(console.log('Hello World'));
});

module.exports = app;