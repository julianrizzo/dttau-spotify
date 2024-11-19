import { Request, Response, Error, Body } from "npm:express";
import request from 'npm:request';
import { randomBytes } from 'node:crypto';
import { stringify } from 'npm:querystring';
import { config } from 'npm:dotenv';
import process from "node:process";
import { Buffer } from "node:buffer";

import { setUserID, setAccessToken, getRefreshToken, setRefreshToken } from '../helpers/memory.helper.ts';


const generateRandomString = (length: number) => {
    return randomBytes(60)
        .toString('hex')
        .slice(0, length);
}

const stateKey = 'spotify_auth_state';

config({ path: '/../../secret.env' })

const client_id: string | undefined = process.env.CLIENT_ID; // your clientId
const client_secret: string | undefined = process.env.CLIENT_SECRET; // Your secret
const redirect_uri: string | undefined = process.env.CALLBACK; // Your redirect uri


const newLogin = async (_req: Request, res: Response) => {
  const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = 'user-read-private user-read-email streaming app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-private';
    await res.redirect('https://accounts.spotify.com/authorize?' +
        stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
};

const handleCallback = async (req: Request, res: Response) => {

  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authorization: string = 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: authorization
      },
      json: true
    };

    await request.post(authOptions, function (error: Error, response: Response, body: Body) {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token,
          refresh_token = body.refresh_token;
        
        setAccessToken(access_token);
        setRefreshToken(refresh_token);

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (_error: Error, _response: Response, body: Body) {
          console.log(body);
          const user_id = body.id;
          setUserID(user_id);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
};

const refreshToken = async (_req: Request, res: Response) => {

  // var refresh_token = req.query.refresh_token;
  console.log('starting refresh');
  const authorization: string = 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': authorization
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: getRefreshToken()
    },
    json: true
  };

  console.log('posting request');

  await request.post(authOptions, function (error: Error, response: Response, body: Body) {
    
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      // refresh_token = body.refresh_token;

      setAccessToken(access_token);

      res.send({
        'access_token': access_token,
        'refresh_token': getRefreshToken()
      });
    }
  });
};


export {
    newLogin,
    handleCallback,
    refreshToken
}