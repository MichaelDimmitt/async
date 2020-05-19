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

/*
 * This implementation uses a function definition and does not return by default.
 * This implementation shows everything that goes on under the hood.
 * A promise that succeeds is in the resolve state, when a failure occours it switches to the reject state.
function verboseGetNextMeetup() {
  return fetch('https://api.meetup.com/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key)
  .then(
    response => { return response.json();},
    err => { throw err }
  )
  .then(
    json => {
      const meetingArray = json.results;
      setTimeToNewYork(meetingArray);
      return meetingArray[0]; },
    err => { throw err }
  );
}
 * '.then' accepts two functions as parameters, resolve fn and reject fn
 * commonly '.then' is used with one parameter, only to handle resolve,
 * and using .catch to handle reject. However, '.catch' can swallow errors
 * that could occour from a dispatched action, setState triggering render function, etc.
 * see demo7-promise-react-example.js
*/

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

