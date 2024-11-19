import axios from 'npm:axios';
import { Request, Response } from "npm:express";

import { getUserID, getAccessToken } from '../helpers/memory.helper.ts';

const getUserPlaylists = async (_req: Request, _res: Response) => {
  const options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    json: true,
    method: 'GET'
  };

  const response = await axios(options);

  const playlists = response.data.items
    .filter((item: { owner: { id: string; }; }) => item.owner.id === getUserID())
    .map((item: { name: string; id: string; }) => ({ name: item.name, id: item.id }));
  console.log(playlists);

  return(playlists);
};

const getSpotifyPlaylists = async (_req: Request, _res: Response) => {

  const options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    json: true,
    method: 'GET'
  };

  const response = await axios(options);

  const playlists = response.data.items
    .filter((item: { owner: { display_name: string; }; }) => item.owner.display_name === "Spotify")
    .map((item: { name: string; id: string; owner: string; }) => ({ name: item.name, id: item.id, owner: item.owner }));

  return(playlists);
};


const getDevices = async (_req: Request, _res: Response) => {
  const options = {
    url: 'https://api.spotify.com/v1/me/player/devices',
    headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    json: true,
    method: 'GET'
  };

  const response = await axios(options);
  
  return(response.data.devices);
}

export {
  getUserPlaylists,
  getSpotifyPlaylists,
  getDevices
}