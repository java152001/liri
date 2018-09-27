require("dotenv").config();

var command = process.argv[2];
var search = process.argv[3];

var keys = require("./keys.js");
var request = require('request');

// var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb.id;

if (command === 'movie-this') {
    var url = 'http://www.omdbapi.com/?t=' + search + '&y=&plot=short&apikey=' + omdb;

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