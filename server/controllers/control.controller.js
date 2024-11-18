const { resume, pause } = require('../services/control.service');

const resumeMusic = async (req, res) => {
    let response = await resume();
    res.send(response.data);
};

const pauseMusic = async (req, res) => {
    let response = await pause();
    res.send(response.data);
};


module.exports = {
    resumeMusic,
    pauseMusic
}