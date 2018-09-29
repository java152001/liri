require("dotenv").config();

var command = process.argv[2];
var search = process.argv[3];

var keys = require("./keys.js");
var request = require('request');
var moment = require('moment');

// var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.id;
var bandsIT = keys.bandsIT.id;

if (command === 'movie-this') {
    movieThis(search);
}

if (command === 'concert-this') {
    bandsInTown(search);
}

if (command === 'do-what-it-says') {
    var fs = require('fs');

    fs.readFile("random.txt", "utf8", function(error, data) {

    var inputArr = data.split(",");
    
    });
}

function movieThis (movie) {
    var url = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=' + omdb;

    console.log(url);

    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var spacer = '---------------------------------';
            console.log(spacer);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Produce: " + JSON.parse(body).Country);
            console.log("Language of Movie: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Main Actors/Actresses: " + JSON.parse(body).Actors);
            console.log(spacer);
        }
    });
}

function bandsInTown (artist) {

    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsIT;

    console.log(url);

    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var bandInfo = JSON.parse(body);
            console.log('-------------------------');
            console.log("Venue Name: " + bandInfo[0].venue.name);
            console.log("Venue Location: " + bandInfo[0].venue.city + ", " + bandInfo[0].venue.region + " " + bandInfo[0].venue.country);
            var date = bandInfo[0].datetime;
            console.log("Date: " + moment(date).format('MM/DD/YYYY'));
        }
    });

}