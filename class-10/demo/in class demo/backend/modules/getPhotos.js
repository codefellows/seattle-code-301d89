'use strict';

const axios = require('axios');
// cache object goes here
const cache = require('./cache.js');

async function getPhotos(req, res) {
    const searchQuery = req.query.searchQuery; 
    const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${searchQuery}`;
    try {
        // Make a key
        const key = searchQuery + 'photo'; // add normalization?
        // Notes For Lab: 
        // + 'weather'
        // + 'movies'
        
        // If the key exists in cache AND is valid, then send THAT data from cache
        if (cache[key] && (Date.now() - cache[key].timeStamp < 5000 )) {
            console.log('Cache was hit, images present');
            res.status(200).send(cache[key].data);
        } else {
            const photoResponse = await axios.get(url);
            const photoArray = photoResponse.data.results.map(photo => new Photo(photo));

            // Save to cache
            cache[key] = {
                timeStamp: Date.now(),
                data: photoArray,
            }
            
            console.log('Cache is:', cache);
            res.status(200).send(photoArray);
        }
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
