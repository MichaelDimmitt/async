const fs = require('fs');
const location = __dirname + '/sometext.txt';

readFilePromise(location).then(result => {
    console.log(result);
}).catch(err => {
    console.error(err);
})

function readFilePromise(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf-8', (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}
