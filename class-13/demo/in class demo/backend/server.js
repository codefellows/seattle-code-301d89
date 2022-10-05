'use strict';

// Requirements
require('dotenv').config();
const cors = require('cors');
const express = require('express');
// bring in mongoose
const mongoose = require('mongoose');

// Set up Express App
const app = express();

// Middleware
app.use(cors());
// NEW!! don't forget to add!
// If req.body is undefined, make sure to use express.json() middleware!
app.use(express.json());


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

async function getCats(req, res, next) {
    try {
        // queries our mongo cats-db database, and finds all cats
        const results = await Cat.find();
        res.status(200).send(results);
    } catch (error) {
        next(error);
    }
}

// POST Endpoint, will trigger a Create action on our db
app.post('/cats', postCats);

async function postCats(req, res, next) {
    // double check what's added to database
    console.log(req.body);
    try {
        // "Cat" is the name of the model, .create() is the mongoose method, req.body is the cat information
        const newCat = await Cat.create(req.body);
        res.status(201).send(newCat);
    } catch (error) {
        next(error);
    }
}

// DELETE Endpoint

app.delete('/cats/:id', deleteCat);

async function deleteCat(req, res, next) {
    const id = req.params.id;
    console.log(id);
    try {
        await Cat.findByIdAndDelete(id);
        res.status(204).send('Successfully Deleted');
    } catch (error) {
        next(error);
    }
}


// PUT Endpoint

app.put('/cats/:id', putCat);

async function putCat(req, res, next) {
    const id = req.params.id;
    console.log(id);
    try {
        const data = req.body;

        // .findByIdAndUpdate method - takes 3 arguments:
        // 1. id of the thing (document) to update
        // 2. updated data object
        // 3. mongoose options object - { new: true, overwrite: true}

        const options = {
            new: true,
            overwrite: true,
        };

        // Represents the updated document! Here, it is the updated cat
        const updatedCat = await Cat.findByIdAndUpdate(id, data, options);
        res.status(201).send(updatedCat);
    } catch (error) {
        next(error);        
    }    
}



app.get('*', (req, res) => {
    res.status(404).send('Not available');
});

// put this error handling at the bottom
// It's the last app.use()!
app.use((error, req, res) => {
    res.status(500).send(error.message);
}) 
