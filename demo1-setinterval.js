
let counter = 1;

function addToCounter() {
    console.log(counter);
    counter++;
    if (counter > 10) {
        clearInterval(timer);
    }
}

let timer = setInterval(addToCounter, 1000);

