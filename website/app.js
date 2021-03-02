/* Global Variables */

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'XXXX';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();


// Event Listener to add function to existing dom element
document.getElementById('generate').addEventListener('click', performAction);

// Making an API call

function performAction(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

retrieveData(baseURL, zipCode, apiKey)
.then(function(userData) {
    postData('/addWeatherInfo', {date:newDate, temp:userData.main.temp, content})
}).then(function(newData) {
    updateUI()
});

}

const retrieveData = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipCode + "&appid="+ apiKey + "&units=metric"); //Celcius

    try {
        const userData = await res.json();
        return userData;
    } catch (error) {
        console.log("error", error);
    }
}



// making a post request to server route

const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body Data type must match "Content-Type" header
        body: JSON.stringify(data), 
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error);
        // appropirately handle the error
    }
}


// Updating user interface

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.content;
    } catch(error) {
        console.log("error", error);
    }
}
