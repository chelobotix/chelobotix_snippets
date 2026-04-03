# Closure

```javascript
//Counter
function createCounter() {
  let counter = 0;
  return function () {
    return counter++;
  };
}
const c1 = createCounter();
const c2 = createCounter();
// console.log(c1()); => 0
// console.log(c1()); => 1
// console.log(c2()); => 0


// Encapsulation
function test() {
  let inside = 1;
  return function (number) {
    inside = number;
    return inside;
  };
}

const a = test();
console.log(a(2));
console.log(a(6));
```
