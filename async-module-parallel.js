const async = require('async');

function counter(value, terminus, direction, cb) {
    console.log(`${direction}: ${value}`);
    if (value < terminus && direction === 'up') {
        setImmediate(() => {
            counter(value + 1, terminus, direction, cb);
        });
    } else if (value > terminus && direction === 'down') {
        setImmediate(() => {
            counter(value - 1, terminus, direction, cb);
        });
    } else {
        cb(null, value);
    }
}

async.parallel([
    function (callback) {
        counter(0, 100, 'up', callback);   
    },
    function (callback) {
        counter(100, 0, 'down', callback);   
    }    
], function (err, results) {
    console.log('Processing finished!')
    console.log(results);
});
