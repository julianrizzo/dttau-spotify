# Spotify API

## About <a name = "about"></a>

Spotify API bot for the DTT office.

## Setup <a name = "setup"></a>

The first time the repo is cloned, the following commands will need to be run.

Install node packages:
```
cd server
deno install
```

To create the `.env` file and `local_tokens` directory:
```
./scripts/setup.sh
```
The secret.env file can then be filled out with the client ID, client secret and callback url.

## Run <a name = "run"></a>

To run the server, run the following from the `server` directory:
```
deno run -A app.ts
```

The application can then be accessed from `http://localhost:8888`

If this is the first time running the application on the machine, create a `NEW TOKEN`. For subsequent tokens, you can use `REFRESH TOKEN` as the initial tokens will be saved to file.

## Usage <a name = "usage"></a>
Accessing the application in the browser gives you access to the following actions:
- *NEW TOKEN* - Generates a new access and refresh token
- *REFRESH TOKEN* - Generates a new access token based on the refresh token saved
- *User Playlists* - Lists all playlists by the logged in user
- *Spotify Playlists* - List all the playlists from Spotify that are saved by the current user
- *Devices* - List all devices that are currently logged in and active
- *Start Music* - Picks a random Spotify playlist and plays it on the first device listed (assuming it is the only device at this stage)
- *Resume* - Plays current track that is in the queue
- *Pause* - Pauses the current track
- *Memory* - Lists all values that are currently stored in-memory

## Cron Schedule <a name = "cron_schedule"></a>
The following scripts can be added to the machines `crontab` to automate music playing and pausing each day (9am and 5pm):
```
0 9 * * 1-5 /path/to/start.sh
0 17 * * 1-5 /path/to/stop.sh
```