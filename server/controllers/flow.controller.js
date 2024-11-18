const { setDeviceID } = require('../helpers/memory.helper');
const { getSpotifyPlaylists, getDevices } = require('../services/data.service');
const { playPlaylist } = require('../services/control.service');

const startMusic = async (req, res) => {
    try {
        const devices = await getDevices(req, res);
        const playlists = await getSpotifyPlaylists(req, res);

        if (!devices || !devices.length) {
            return res.status(400).send({ error: "No devices found" });
        }
        if (!playlists || !playlists.length) {
            return res.status(400).send({ error: "No playlists found" });
        }

        const select = playlists[Math.floor(Math.random() * playlists.length)];
        console.log("Select: " + select.name);
        console.log("Device: " + devices[0].name);

        setDeviceID(devices[0].id);

        const response = await playPlaylist(req, res, select.id, devices[0].id);

        console.log(response.status);
        // Send the final response
        if(response.status == 204) {
            res.send(`Playing "${select.name}" on device ${devices[0].name}`);
        } else if (response.status == 401) {
            res.send("You need a new access token");
        } else {
            res.send("Something went wrong :(");
        }
    } catch (error) {
        console.error("Error in startMusic:", error);
        res.status(500).send({ error: "An error occurred while starting music" });
    }
};


module.exports = {
    startMusic
}