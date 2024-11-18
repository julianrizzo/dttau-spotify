const { getUserPlaylists, getSpotifyPlaylists, getDevices } = require('../services/data.service');

const listUserPlaylists = async (req, res) => {
  let response = await getUserPlaylists(req,res);
  res.send(response);
};

const listSpotifyPlaylists = async (req, res) => {
  let response = await getSpotifyPlaylists(req,res);
  res.send(response);
};

const listDevices = async (req, res) => {
  let response = await getDevices(req,res);
  res.send(response);
};

module.exports = {
  listUserPlaylists,
  listSpotifyPlaylists,
  listDevices
}