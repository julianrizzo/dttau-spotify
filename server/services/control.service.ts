import axios from 'npm:axios';
import dotenv from 'npm:dotenv';
import { Request, Response, Error } from 'npm:express';

import { getAccessToken, getDeviceID } from '../helpers/memory.helper.ts';

dotenv.config({ path: '/../../secret.env' })

const playPlaylist = async (_req: Request, res: Response, playlistID: string, deviceID: string) => {
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
    } catch (error: Error) {
        console.error("Error in playPlaylist:", error.response?.data || error.message);
        res.status(error.response?.status || 500).send({
            error: error.response?.data || "An error occurred while playing the playlist",
        });
    }
};


const resume = async (_req: Request, _res: Response) => {
    const options = {
        url: 'https://api.spotify.com/v1/me/player/play?device_id=' + getDeviceID(),
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true,
        method: 'PUT'
    };

    const response = await axios(options);

    return(response);
};

const pause = async (_req: Request, _res: Response) => {
    const options = {
        url: 'https://api.spotify.com/v1/me/player/pause?device_id=' + getDeviceID(),
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        json: true,
        method: 'PUT'
    };

    const response = await axios(options);

    return(response);
};


export {
    playPlaylist,
    resume,
    pause
}