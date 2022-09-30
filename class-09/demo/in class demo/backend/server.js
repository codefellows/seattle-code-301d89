'use strict';

// Require
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// we have moved axios to getPhotos.js!
// const axios = require('axios');
const { response } = require('express');

// put relative filepath with ./ at the beginning
const getPhotos = require('./modules/getPhotos.js');

// Express instance
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));


// Endpoints

app.get('/photos', getPhotos);

app.get('*', notFound);

function notFound(req, res) {
    res.status(404).send('Error Not Found');
}
