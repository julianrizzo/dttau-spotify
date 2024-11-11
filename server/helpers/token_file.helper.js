const fs = require('fs');

function write_token_file(token_type, token) {

    console.log("Writing... " + token_type);
    console.log("with value... " + token);

    file_location = './local_tokens/' + token_type + '.txt';

    fs.writeFile(file_location, token, { flag: 'w' }, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('A new "' + token_type + '" has been saved to file...');
        }
    });
}

function read_token_file(token_type) {

    file_location = './local_tokens/' + token_type + '.txt';

    try {
        return fs.readFileSync(file_location, 'utf-8');
    } catch (error) {
        console.error(error);
        return('');
    }

    // fs.readFileSync(file_location, "utf8", (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return '';
    //     } else {
    //         console.log('Successfully read "' + token_type + '" file...');
    //         console.log(data.toString());
    //         return data;
    //     }
    // });
}

module.exports = {
    write_token_file,
    read_token_file
  };