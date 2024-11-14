const { setAccessToken, setRefreshToken, setUserID } = require('./memory.helper');
const { read_file } = require('./file.helper');

// Saves the token files into memory to be accessed while the app is running
function initialiseApp() {
    setAccessToken(read_file('global_access_token'), false);
    setRefreshToken(read_file('global_refresh_token'), false);
    setUserID(read_file('global_user_id'), false);
};

module.exports = {
    initialiseApp
}