
function* myIterator() {
    yield 14;
    yield 22;
    yield 16;
    return 18;
}

console.log('While-Loop');

const iterator = myIterator();
let next = iterator.next().value;
while(next) {
  console.log(next);
  next = iterator.next().value;
}

console.log('For-of-Loop');

const g = myIterator();
for(const v of g) {
  console.log(v);
}
