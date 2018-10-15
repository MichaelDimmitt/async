# Async
Examples from the Async presentation from October 2018. Here are the [slides](https://slides.com/davidfekke/async) from that [meetup](https://www.meetup.com/Jax-Node-js-UG/events/255151261/).

## Timers

Timer functions include `setImmediate`, `setTimeout` and `setInterval`.

```javascript
setTimeout(function () {
    console.log('Print something in awhile.');
}, 2000); // This will print 'Print something in awhile.' in 2 seconds.
```

## Error first Callbacks

Error first Callbacks are functions that do not return any value, but have a last parameter that take a function with two parameters. The first paramater is usually some sort of error, while the second parameter is the data that would have been normally returned in a Synchronous function.

```javascript 
const fs = require('fs');
const location = __dirname + '/sometext.txt';

fs.readFile(location, 'utf-8', function (err, result) {
    if (err) {
        console.error(err);
    }
    console.log(result);
});

```

This can also be separated into a separate function to make it more readable.

```javascript 
const fs = require('fs');
const location = __dirname + '/sometext.txt';

fs.readFile(location, 'utf-8', processFile);

function processFile(err, result) {
    if (err) {
        console.error(err);
    }
    console.log(result);
}
```

## Generators

Generators can yield many results without have to complete execution until all of the data has been delivered. These function can be identified by having `*` between the function keyword and function name as shown in the example below.

```javascript
function* myIterator() {
    yield 14;
    yield 22;
    yield 16;
    return 18;
}

const iterator = myIterator();
iterator.next().value; // 14
iterator.next().value; // 22
iterator.next().value; // 16 
```

## Promises

Promises are a special object asynchornous type that are a kind of monad. Promises use a constructor that take a callback with a `resolve` and `reject` parameters. Errors are passed into the `reject` function callback, and succesful results are passed back through the `resolve` callback.

```javascript
const promise = new Promise(function(resolve, reject) {
  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});

promise.then(result => {
    console.log(result);
}).catch(err => {
    console.error(err);
});
```

# Async/Await

The async and await keywords were added as part of the es2017 language specification. Any function can be turned into a promise by adding the `async` keyword to the beginning of the function. Any thenable promise can be resolved inside of that async function by placing the `await` keyword in front of the promise. 

```javascript
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: 'resolved'
}

asyncCall();
```

Copyright 2018 JaxNode.