'use strict';

const axios = require('axios');

async function getPhotos(req, res) {
    const searchQuery = req.query.searchQuery; 
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

// this is kept private, not shared with server.js
class Photo {
    constructor(obj) {
        this.img_url = obj.urls.regular;
        this.photographer = obj.user.name;
    }
}

// node export syntax:
module.exports = getPhotos;
