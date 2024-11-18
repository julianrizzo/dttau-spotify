const axios = require('axios');

const { getUserID, getAccessToken } = require('../helpers/memory.helper');

const getUserPlaylists = async (req, res) => {
  var options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    json: true,
    method: 'GET'
  };

  let response = await axios(options);

  const playlists = response.data.items
    .filter(item => item.owner.id === getUserID())
    .map(item => ({ name: item.name, id: item.id }));
  console.log(playlists);

  return(playlists);
};

const getSpotifyPlaylists = async (req, res) => {

  var options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    json: true,
    method: 'GET'
  };

  let response = await axios(options);

  const playlists = response.data.items
    .filter(item => item.owner.display_name === "Spotify")
    .map(item => ({ name: item.name, id: item.id, owner: item.owner }));

  return(playlists);
};


const getDevices = async (req, res) => {
  var options = {
    url: 'https://api.spotify.com/v1/me/player/devices',
    headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    json: true,
    method: 'GET'
  };

  let response = await axios(options);
  
  return(response.data.devices);
}

module.exports = {
  getUserPlaylists,
  getSpotifyPlaylists,
  getDevices
}