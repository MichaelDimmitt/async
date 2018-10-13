const fs = require('fs');
const location = __dirname + '/howoldisJaxNode.txt';

fs.readFile(location, 'utf-8', (err, results) => {
    if (err) {
        console.error(err);
    }
    console.log(results);
});
