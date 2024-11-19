// const express = require('express');
import express, { Express, Request, Response } from "npm:express";
// const cors = require('cors');
import cors from "npm:cors";
// const cookieParser = require('cookie-parser');
import cookieParser from "npm:cookie-parser";

import { listUserPlaylists, listSpotifyPlaylists, listDevices } from './controllers/data.controller.ts';
import { resumeMusic, pauseMusic } from './controllers/control.controller.ts';
import { startMusic } from './controllers/flow.controller.ts';
import { getMemoryItems } from './controllers/memory.controller.ts';
import { newLogin, handleCallback, refreshToken } from './controllers/auth.controller.ts';
import { initialiseApp } from './helpers/initialise.helper.ts';


initialiseApp();

const app: Express = express();

app.use(express.static('public'))
  .use(cors())
  .use(cookieParser());


// API ENDPOINTS - AUTH
app.get('/login', newLogin);
app.get('/api/callback', handleCallback);
app.get('/refresh_token', refreshToken);


// API ENDPOINTS - MEMORY
app.get('/memory', getMemoryItems);


// API ENDPOINTS - DATA
app.get('/data/playlists', listUserPlaylists);
app.get('/data/SpotifyPlaylists', listSpotifyPlaylists);
app.get('/data/devices', listDevices);

// API ENDPOINTS - CONTROL
app.get('/control/resume', resumeMusic);
app.get('/control/pause', pauseMusic);
app.get('/control/play', (_req: Request, res: Response) => {
  res.send('Endpoint not yet available!');
});

// API ENDPOINTS - FLOW
app.get('/flow/start', startMusic);
app.get('/flow/stop', (_req: Request, res: Response) => {
  res.send('Endpoint not yet available!');
});


console.log('Listening on 8888');
app.listen(8888);