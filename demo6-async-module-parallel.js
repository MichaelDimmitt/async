const async = require('async');

function counter(value, terminus, direction, cb) {
    console.log(`${direction}: ${value}`);
    if (value < terminus && direction === 'up') {
        setTimeout(() => {
            counter(value + 1, terminus, direction, cb);
        },0);
    } else if (value > terminus && direction === 'down') {
        setTimeout(() => {
            counter(value - 1, terminus, direction, cb);
        },0);
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
