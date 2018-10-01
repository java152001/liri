require("dotenv").config();

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

var keys = require("./keys.js");
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret});

var omdb = keys.omdb.id;
var bandsIT = keys.bandsIT.id;

if (command === 'movie-this') {
    movieThis(search);
}

if (command === 'concert-this') {
    bandsInTown(search);
}

if (command === 'spotify-this-song') {
    songThis(search);
}

if (command === 'do-what-it-says') {
    var fs = require('fs');

    fs.readFile("random.txt", "utf8", function(error, data) {

    var inputArr = data.split(",");

    if (inputArr[0] === 'movie-this') {
        movieThis(inputArr[1]);
    }
    else if (inputArr[0] === 'concert-this') {
        bandsInTown(inputArr[1]);
    }
    else if (inputArr[0] === 'spotify-this-song') {
        songThis(inputArr[1]);
    }
    
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

function songThis (song) {

    if (!song) {
        song = "The Sign";
    }

    spotify.search({type: 'track', query: song }, function(err, data) {

        if (err) {
           return console.log(err);
        }

        console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name + "\n");
        
    })
}