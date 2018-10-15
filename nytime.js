const moment = require('moment-timezone');

function setTimeToNewYork(meetingArray) {
    if (meetingArray && meetingArray.length > 0) {
        var currTime = moment(meetingArray[0].time).utc().clone();
        meetingArray[0].time = currTime.tz('America/New_York').format('lll');
    }
}

module.exports = setTimeToNewYork;
