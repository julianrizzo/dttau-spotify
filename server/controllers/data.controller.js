const request = require('request');

const { getUserID, getAccessToken } = require('../helpers/memory.helper');

const getUserPlaylists = async (req, res) => {
  var options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    json: true
  };

  request.get(options, function (error, response, body) {

    const playlists = body.items
      .filter(item => item.owner.id === getUserID())
      .map(item => ({ name: item.name, id: item.id }));
    console.log(playlists);

    res.send(playlists);
  });
};

const getSpotifyPlaylists = async (req, res) => {
  return new Promise((resolve, reject) => {

    var options = {
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: { 'Authorization': 'Bearer ' + getAccessToken() },
      json: true
    };

    request.get(options, function (error, response, body) {

      const playlists = body.items
        .filter(item => item.owner.display_name === "Spotify")
        .map(item => ({ name: item.name, id: item.id, owner: item.owner }));

      resolve(playlists);
      res.send(playlists);
    });
  });
};


const getDevices = async (req, res) => {
  var options = {
    url: 'https://api.spotify.com/v1/me/player/devices',
    headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    json: true
  };

  request.get(options, function (error, response, body) {

    console.log(body);

    const devices = body.devices;
    console.log(devices);

    res.json(devices);
  });
};

module.exports = {
  getUserPlaylists,
  getSpotifyPlaylists,
  getDevices
}