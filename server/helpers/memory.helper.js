var global_access_token;
var global_refresh_token;
var user_id;

function getAccessToken() {
    return global_access_token;
}

function setAccessToken(new_access_token) {
    global_access_token = new_access_token;
}

function getRefreshToken() {
    return global_refresh_token;
}

function setRefreshToken(new_refresh_token) {
    global_refresh_token = new_refresh_token;
}

function getUserID() {
    return user_id;
}

function setUserID(new_user_id) {
    user_id = new_user_id;
}

module.exports = {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    getUserID,
    setUserID
}