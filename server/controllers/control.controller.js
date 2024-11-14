const request = require('request');
const dotenv = require('dotenv');

const { getAccessToken } = require('../helpers/memory.helper');

dotenv.config({ path: __dirname + '/../../secret.env' })

var device_id_params = "?device_id=" + process.env.DEVICE_ID

const resumeMusic = async (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me/player/play' + device_id_params,
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true
    };

    request.put(options, function (error, response, body) {
        res.send(body);
    });
};

const pauseMusic = async (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me/player/pause' + device_id_params,
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true
    };

    request.put(options, function (error, response, body) {
        res.send(body);
    });
};


module.exports = {
    resumeMusic,
    pauseMusic
}