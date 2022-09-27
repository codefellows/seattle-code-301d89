"use strict";
// This will be our server!!

// Set Up:
// --------------------

require("dotenv").config();
// express server
const express = require("express");
// Allows for Cross Origin Resource Sharing
const cors = require("cors");
// load data
const data = require("./data/data.json");
// start our server
const app = express();

// Middleware
// The app.use() function is used to mount the specified middleware function(s) at the path which is being specified
app.use(cors());

// Declare our PORT variable
const PORT = process.env.PORT || 3001;

// Listening for connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

// Endpoints:
// --------------------

app.get("/", (req, res) => {
  // sends a response
  res.send("Hello from the home route! again!");
});

app.get("/supplies", (req, res) => {

    // the req object has a property .query which is an object
    // the query object has properties for each query param from the front end
    // therefore, req.query.searchQuery has the value "city goes here" (hard coded from the front-end)
    
    // in your lab, card 2., task 3, your /weather endpoint will use:
        // req.query.lat
        // req.query.lon
        // req.query.searchQuery 
    console.log(req.query); // in terminal: 
														// {
														//   searchQuery: 'city goes here',
														//   lat: 'lat goes here',
														//   lon: 'lon goes here'
														// }   
														   
    res.send(data.lists[0].items);
});

app.get("/food", (req, res) => {
    res.send(data.lists[1].items);
})


// Catch all endpoint:

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});
