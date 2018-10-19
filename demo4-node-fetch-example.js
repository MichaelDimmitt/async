const fetch = require('node-fetch');
const setTimeToNewYork = require('./nytime');

/*
 * This is the second method used for retrieving the next meetup. It used a Promise.
 * The function returns by default.
*/
const getNextMeetup = () =>
  fetch( 'https://api.meetup.com/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key)
    .then(response => { return response.json();})
    .then(json => {
      const meetingArray = json.results;
      setTimeToNewYork(meetingArray);
      return meetingArray[0];
    })

getNextMeetup().then(
  results => { console.log(results.name); },
  err => { console.error('Your specific error message', err); }
)

/*
 * to compare with getNextMeetup above.
 * see demo7-promise-react-example.js
  getNextMeetup()
    .then(results => {
      console.log(results.name);
    })
    .catch(err => {
      console.error('Your specific error message', err);
    });
*/

// to compare with getNextMeetup above.
async function asyncGetNextMeetup(){
  response = await fetch(
    'https://api.meetup.com/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key
  )
  const meetingArray = response.json().results
  setTimeToNewYork(meetingArray);
  return meetingArray[0];
}

