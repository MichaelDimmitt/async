const https = require('https');
const setTimeToNewYork = require('./nytime');

const httpsOptions = {
    hostname: 'api.meetup.com',
    port: 443,
    path: '/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key,
    method: 'GET'
};

let nextMeeting = '';

getNextMeetup(function(err, results) {
    console.log(results.name);
});

/*
 * This is the original method used for retrieving the next meetup. It used a error first callback
 */
function getNextMeetup(cb) {
    var sreq = https.request(httpsOptions, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            nextMeeting += chunk;
        });
        response.on('end', function () {
            var err = false;
            if (nextMeeting && nextMeeting.toString().slice(0, 6) !== '<html>') {
                var meetingObject = JSON.parse(nextMeeting);
                var meetingArray = meetingObject.results;
                // permanent fix for the changing timezone plus moment deprecation fix.
                setTimeToNewYork(meetingArray);
                nextMeeting = '';
                cb(err, meetingArray[0]);
            } else {
                var meetingObject2 = {};
                meetingObject2.results = [{}];
                cb(err, meetingObject2.results[0]);
            }
        });
    });
    sreq.on('error', function (e) {
        console.log('problem with request: ' + e.message);
        var meetingObject3 = {};
        meetingObject3.results = [{}];
        cb(e, meetingObject3.results[0]);
    });
    sreq.write('data\n');
    sreq.end();
}
