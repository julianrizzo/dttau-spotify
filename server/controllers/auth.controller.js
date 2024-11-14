const request = require('request');
const crypto = require('crypto');
const querystring = require('querystring');
const dotenv = require('dotenv');

const { setUserID, setAccessToken, getRefreshToken, setRefreshToken } = require('../helpers/memory.helper');

const generateRandomString = (length) => {
    return crypto
        .randomBytes(60)
        .toString('hex')
        .slice(0, length);
}

var stateKey = 'spotify_auth_state';

dotenv.config({ path: __dirname + '/../../secret.env' })

var client_id = process.env.CLIENT_ID; // your clientId
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = process.env.CALLBACK; // Your redirect uri


const newLogin = async (req, res) => {
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
};

const handleCallback = async (req, res) => {

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

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token;
        
        setAccessToken(access_token);
        setRefreshToken(refresh_token);

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
          var user_id = body.id;
          setUserID(user_id);
        });

        // we can also pass the token to the browser to make requests from there
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
};

const refreshToken = async (req, res) => {

  // var refresh_token = req.query.refresh_token;
  console.log('starting refresh');

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: getRefreshToken()
    },
    json: true
  };

  console.log('posting request');

  request.post(authOptions, function (error, response, body) {
    
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token
      // refresh_token = body.refresh_token;

      setAccessToken(access_token);

      res.send({
        'access_token': access_token,
        'refresh_token': getRefreshToken()
      });
    }
  });
};


module.exports = {
    newLogin,
    handleCallback,
    refreshToken
}