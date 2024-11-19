import { Request, Response } from "npm:express";
import { getUserPlaylists, getSpotifyPlaylists, getDevices } from "../services/data.service.ts";

const listUserPlaylists = async (req: Request, res: Response) => {
  const response = await getUserPlaylists(req,res);
  res.send(response);
};

const listSpotifyPlaylists = async (req: Request, res: Response) => {
  const response = await getSpotifyPlaylists(req,res);
  res.send(response);
};

const listDevices = async (req:Request, res: Response) => {
  const response = await getDevices(req,res);
  res.send(response);
};

export {
  listUserPlaylists,
  listSpotifyPlaylists,
  listDevices
}