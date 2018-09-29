
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
    id: process.env.omdb_ID
}

exports.bandsIT = {
    id: process.env.BANDS_ID
}