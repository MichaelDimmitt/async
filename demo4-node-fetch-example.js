const fetch = require('node-fetch');
const setTimeToNewYork = require('./nytime');

getNextMeetup().then(results => {
    console.log(results.name);
}).catch(err => {
    console.error(err);
});

/*
 * This is the second method used for retrieving the next meetup. It used a Promise.
 */
function getNextMeetup() {
    return fetch('https://api.meetup.com/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key)
        .then(response => {
            return response.json();
        }).then(json => {
            const meetingArray = json.results;
            setTimeToNewYork(meetingArray);
            resolve(meetingArray[0]);
        });
}
