const { getUserID, getAccessToken, getRefreshToken } = require('../helpers/memory.helper');

const getMemoryItems = async (req, res) => {
    res.json({
        'GAT': getAccessToken(),
        'GRT': getRefreshToken(),
        'UID': getUserID()
    });
};

module.exports = {
    getMemoryItems
}