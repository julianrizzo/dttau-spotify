// Handles the read and write operations for local tokens IN MEMORY

const { write_file } = require('../helpers/file.helper');

var global_access_token;
var global_refresh_token;
var global_user_id;

function getAccessToken() {
    return global_access_token;
}

function setAccessToken(new_access_token, write_flag = true) {
    global_access_token = new_access_token;
    if(write_flag) {
        write_file('global_access_token', new_access_token);
    }
}

function getRefreshToken() {
    return global_refresh_token;
}

function setRefreshToken(new_refresh_token, write_flag = true) {
    global_refresh_token = new_refresh_token;
    if(write_flag) {
        write_file('global_refresh_token', new_refresh_token);
    }
}

function getUserID() {
    return global_user_id;
}

function setUserID(new_user_id, write_flag = true) {
    global_user_id = new_user_id;
    if(write_flag) {
        write_file('global_user_id', new_user_id);
    }
}

module.exports = {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    getUserID,
    setUserID
}