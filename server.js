// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/*Depedencies */

const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 3000;
//spin up the server

const server = app.listen(port, listening);

function listening() {
    console.log('server runnning');
    console.log(`running on localhost: ${port}`);
};


//Get Request

app.get('/all', sendData)

function sendData (req, res) {
    res.send('GET: Weather application');
    console.log(sendData);
};

// Make an array that can hold the data

const data = [];
app.post('/addWeatherInfo', addInfo)

function addInfo (req,res) {
    Object.assign(projectData, req.body);
    res.send(projectData)
}
