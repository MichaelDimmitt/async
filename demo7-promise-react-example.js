/*
https://twitter.com/dan_abramov/status/776891811222675457?lang=en
Dan Abrimov has a great react example that covers best practices for a promise in react.

this is a writeup of the tweet describing proper promise chaining for a ui update
*/
// Bad Practice to use catch when updating a ui in React.
Promise.resolve()
.then(() => {
  this.setState({ loaded: true})
})
.catch(() => {
  console.log('Swallowed')
})
// Your catch() is going to catch any error thrown in the then() chain before it, including the one caused by a render() due to a setState() call.

// If you do not want to catch errors resulting from setState(), and want to only catch network failures (let's imagine your Promise.resolve() is actually a fetch() ), you want to use the second then() argument instead:
// Correct practice for catching network failures and not for updating ui in react.
componentDidMount() {
  Promise.resolve()
  .then(
    () => { this.setState({ loaded: true}) },
    (err) => { console.log("An error occoured (but not in setState!)", err) }
  );
}
// In this case, unless you catch() later in the chain, the error in render() will be uncaught and, with a good Promise polyfill (or with native Promises in Chrome or maybe other browsers), displayed

/*
https://twitter.com/dan_abramov/status/770914625206583296
I cringe when I see .then(() => dispatch(...)).catch(...) in React projects.
If a component throws during dispatch, you’ll get into catch.

The solution is so simple. Just don’t chain catch() *after* then() that renders UI.
Instead pass error handler as second arg to then().
*/


