# Call(), Bind() Apply()

```javascript
const obj1 = {
  fName: 'Marce',
};

const obj2 = {
  fName: 'Natish',
};

function hello(place) {
  console.log(`Hello ${this.fName}, welcome to ${place}`);
}

// call
hello.call(obj1, 'Beach'); //Hello Marce, welcome to Beach
hello.call(obj2, 'Disco'); //Hello Natish, welcome to Disco

// apply pide que los parametros esten en un array
hello.call(obj2, ['Lake']);

// bind
const message = hello.bind(obj1);
message('River');

```
