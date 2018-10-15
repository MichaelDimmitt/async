const axios = require('axios');
const setTimeToNewYork = require('./nytime');

setImmediate(async function() {
    const nextMeeting = await getNextMeetup();
    console.log(nextMeeting.name);
});

async function getNextMeetup() {
    try {
        const json = await axios.get('https://api.meetup.com/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key);
        const meetingArray = json.data.results;
        setTimeToNewYork(meetingArray);
        return meetingArray[0];
    } catch (err) {
        console.error(err);
    }
}