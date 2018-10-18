const fs = require('fs');
const util = require('util');
const location = __dirname + '/sometext.txt';

const readFileAsync = util.promisify(fs.readFile);

readFileAsync(location, 'utf-8').then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
});
