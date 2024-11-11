const express = require('express');
const request = require('request');
const crypto = require('crypto');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const { write_token_file, read_token_file } = require('./helpers/token_file.helper');

// Load account secrets env file
dotenv.config({path:__dirname+'/../secret.env'})

var client_id = process.env.CLIENT_ID; // your clientId
var client_secret = process.env.CLIENT_SECRET; // Your secret
var device_id_params = "?device_id=" + process.env.DEVICE_ID
var redirect_uri = process.env.CALLBACK; // Your redirect uri

var global_access_token = read_token_file('global_access_token');
var global_refresh_token = read_token_file('global_refresh_token');

const generateRandomString = (length) => {
  return crypto
  .randomBytes(60)
  .toString('hex')
  .slice(0, length);
}

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());


// LOGIN
app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email streaming app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});


// CALLBACK
app.get('/api/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

            global_access_token = access_token;
            global_refresh_token = refresh_token;

            write_token_file('global_access_token', global_access_token);
            write_token_file('global_refresh_token', global_refresh_token);

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        // res.redirect('/nav.html')
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});


// REFRESH TOKEN
app.get('/refresh_token', function(req, res) {

  // global_access_token = read_token_file('global_access_token');
  // global_refresh_token = read_token_file('global_refresh_token');

  console.log('GAT:'+global_access_token);
  console.log('GRT:'+global_refresh_token);

  // var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: global_refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token
          // refresh_token = body.refresh_token;

          global_access_token = access_token;
          // global_refresh_token = refresh_token;

          console.log(body);

          console.log("New access token:"+body.access_token);
          

          write_token_file('global_access_token', access_token);
          // write_token_file('global_refresh_token', refresh_token);
      res.send({
        'access_token': access_token,
        'refresh_token': global_refresh_token
      });
    }
  });
});

app.get('/memory', function(req,res) {
  res.json({
    'GAT': global_access_token,
    'GRT': global_refresh_token
  })
});


// PLAYLISTS
app.get('/data/playlists', function(req, res) {
  var options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: { 'Authorization': 'Bearer ' + global_access_token },
    json: true
  };

  request.get(options, function(error, response, body) {

    const playlists = body.items
      .filter(item => item.owner.id === 'julian_170')
      .map(item => item.name);
    console.log(playlists);

    res.send(playlists);
  });
});


// DEVICES
app.get('/data/devices', function(req, res) {
  var options = {
    url: 'https://api.spotify.com/v1/me/player/devices',
    headers: { 'Authorization': 'Bearer ' + global_access_token },
    json: true
  };

  request.get(options, function(error, response, body) {

    console.log(body);

    const devices = body.devices;
      // .map(item => item.name);
    console.log(devices);

    res.json(devices);
  });
});

// PLAY
app.get('/control/play', function(req, res) {

  var options = {
    url: 'https://api.spotify.com/v1/me/player/play' + device_id_params,
    headers: { 'Authorization': 'Bearer ' + global_access_token },
    json: true
  };

  request.put(options, function(error, response, body) {
    res.send(body);
  });
});


// RESUME
app.get('/control/resume', function(req, res) {
  var options = {
    url: 'https://api.spotify.com/v1/me/player/play' + device_id_params,
    headers: { 'Authorization': 'Bearer ' + global_access_token },
    json: true
  };

  request.put(options, function(error, response, body) {
    res.send(body);
  });
});


// PAUSE
app.get('/control/pause', function(req, res) {
  var options = {
    url: 'https://api.spotify.com/v1/me/player/pause' + device_id_params,
    headers: { 'Authorization': 'Bearer ' + global_access_token },
    json: true
  };

  request.put(options, function(error, response, body) {
    res.send(body);
  });
});

console.log('Listening on 8888');
app.listen(8888);