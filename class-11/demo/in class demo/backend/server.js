'use strict';

// Requirements
require('dotenv').config();
const cors = require('cors');
const express = require('express');
// bring in mongoose
const mongoose = require('mongoose');

// Set up Express App
const app = express();
app.use(cors());

// Mongoose 
mongoose.connect(process.env.DB_URL); // DB url in our .env goes here
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));
db.once('open', function() {
    console.log('Mongoose is connected to mongo');
});
const Cat = require('./models/cat.js');

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));


// Endpoints

app.get('/', (req, res) => {
    res.status(200).send('Welcome!');
});


app.get('/cats', getCats);

async function getCats(req, res) {
    try {
        // queries our mongo cats-db database, and finds all cats
        const results = await Cat.find();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error);
    }
}