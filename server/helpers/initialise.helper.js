const { setAccessToken, setRefreshToken, setUserID } = require('./memory.helper');
const { read_file } = require('./file.helper');

function initialiseApp() {
    setAccessToken(read_file('global_access_token'));
    setRefreshToken(read_file('global_refresh_token'));
    setUserID(read_file('global_user_id'));
};

module.exports = {
    initialiseApp
}