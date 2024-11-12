const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { getPlaylists, getDevices } = require('./controllers/data.controller');
const { resumeMusic, pauseMusic } = require('./controllers/control.controller');
const { getMemoryItems } = require('./controllers/memory.controller');
const { newLogin, handleCallback, refreshToken } = require('./controllers/auth.controller');
const { initialiseApp } = require('./helpers/initialise.helper');


initialiseApp();

var app = express();

app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());


// API ENDPOINTS - AUTH
app.get('/login', newLogin);
app.get('/api/callback', handleCallback);
app.get('/refresh_token', refreshToken);


// API ENDPOINTS - MEMORY
app.get('/memory', getMemoryItems);


// API ENDPOINTS - DATA
app.get('/data/playlists', getPlaylists);
app.get('/data/devices', getDevices);


// API ENDPOINTS - CONTROL
app.get('/control/resume', resumeMusic);
app.get('/control/pause', pauseMusic);
app.get('/control/play', (req, res) => res.send('Endpoint not yet available!'));

// API ENDPOINTS - FLOW
app.get('/flow/start', (req, res) => res.send('Endpoint not yet available!'));
app.get('/flow/stop', (req, res) => res.send('Endpoint not yet available!'));


console.log('Listening on 8888');
app.listen(8888);