const { getUserID, getAccessToken, getRefreshToken, getDeviceID } = require('../helpers/memory.helper');

const getMemoryItems = async (req, res) => {
    res.json({
        'Global Access Token': getAccessToken(),
        'Global Refresh Token': getRefreshToken(),
        'User ID': getUserID(),
        'Global Device ID': getDeviceID()
    });
};

module.exports = {
    getMemoryItems
}