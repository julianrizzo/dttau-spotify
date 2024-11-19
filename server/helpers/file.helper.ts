// Handles the read and write operations for local tokens IN LOCAL_TOKENS DIRECTORY

import fs from 'node:fs';

function write_file(file_name: string, content: string) {

    const file_location = './local_tokens/' + file_name + '.txt';

    fs.writeFile(file_location, content, { flag: 'w' }, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('A new "' + file_name + '" has been saved to file...');
        }
    });
}

function read_file(file_name: string) {

    const file_location = './local_tokens/' + file_name + '.txt';

    try {
        return fs.readFileSync(file_location, 'utf-8');
    } catch {
        console.log("No file found for: " + file_name);
        return('');
    }
}

export {
    write_file,
    read_file
  };