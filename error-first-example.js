const fs = require('fs');
const location = __dirname + '/sometext.txt';

fs.readFile(location, 'utf-8', processFile);

function processFile(err, result) {
    if (err) {
        console.error(err);
    }
    console.log(result);
}
