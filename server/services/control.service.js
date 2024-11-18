const axios = require('axios');
const dotenv = require('dotenv');

const { getAccessToken, getDeviceID } = require('../helpers/memory.helper');

dotenv.config({ path: __dirname + '/../../secret.env' })

const playPlaylist = async (req, res, playlistID, deviceID) => {
    try {
        const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`;
        const headers = {
            Authorization: `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json',
        };
        const body = {
            context_uri: `spotify:playlist:${playlistID}`,
        };

        // Make the Axios request
        const response = await axios.put(url, body, { headers });

        // Send the response data back to the client
        return(response);
    } catch (error) {
        console.error("Error in playPlaylist:", error.response?.data || error.message);
        res.status(error.response?.status || 500).send({
            error: error.response?.data || "An error occurred while playing the playlist",
        });
    }
};


const resume = async (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me/player/play?device_id=' + getDeviceID(),
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true,
        method: 'PUT'
    };

    let response = await axios(options);

    return(response);
};

const pause = async (req, res) => {
    var options = {
        url: 'https://api.spotify.com/v1/me/player/pause?device_id=' + getDeviceID(),
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true,
        method: 'PUT'
    };

    let response = await axios(options);

    return(response);
};


module.exports = {
    playPlaylist,
    resume,
    pause
}