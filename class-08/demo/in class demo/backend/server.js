'use strict';

// Require
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// NEW: 
const axios = require('axios');
const { response } = require('express');

// Express instance
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));


// Endpoints

app.get('/photos', getPhotos);

// Problem Solving:
// 1. check that server is running
// 2. in frontend, check the network tab
// 3. in the backend visit the url || thunder client GET request
// = should see json data from the API

async function getPhotos(req, res) {
    const searchQuery = req.query.searchQuery; // note to use .searchQuery on FE
    const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${searchQuery}`;
    try {
        const photoResponse = await axios.get(url);
        const photoArray = photoResponse.data.results.map(photo => new Photo(photo));
        res.status(200).send(photoArray);
    } catch (error) {
        console.log('error message is: ', error);
        response.status(500).send(`server error ${error}`);
    }
}

class Photo {
    constructor(obj) {
        this.img_url = obj.urls.regular;
        this.photographer = obj.user.name;
    }
}

// '*' has to be LAST
app.get('*', notFound);

function notFound(req, res) {
    response.status(404).send('Error Not Found');
}