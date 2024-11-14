// Handles the read and write operations for local tokens IN LOCAL_TOKENS DIRECTORY

const fs = require('fs');

function write_file(file_name, content) {

    file_location = './local_tokens/' + file_name + '.txt';

    fs.writeFile(file_location, content, { flag: 'w' }, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('A new "' + file_name + '" has been saved to file...');
        }
    });
}

function read_file(file_name) {

    file_location = './local_tokens/' + file_name + '.txt';

    try {
        return fs.readFileSync(file_location, 'utf-8');
    } catch (error) {
        console.log("No file found for: " + file_name);
        return('');
    }
}

module.exports = {
    write_file,
    read_file
  };