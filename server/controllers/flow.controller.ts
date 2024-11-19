import { Request, Response } from "npm:express";

import { setDeviceID } from '../helpers/memory.helper.ts';
import { getSpotifyPlaylists, getDevices } from '../services/data.service.ts';
import { playPlaylist } from '../services/control.service.ts';

const startMusic = async (req: Request, res: Response) => {
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

        if(response){
            console.log(response.status);
            // Send the final response
            if(response.status == 204) {
                res.send(`Playing "${select.name}" on device ${devices[0].name}`);
            } else if (response.status == 401) {
                res.send("You need a new access token");
            } else {
                res.send("Something went wrong :(");
            }
        };
        
    } catch (error) {
        console.error("Error in startMusic:", error);
        res.status(500).send({ error: "An error occurred while starting music" });
    }
};


export {
    startMusic
}