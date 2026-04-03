# This

```javascript
const obj1 = {
  fName: 'Marce',

  test1: function () {
    console.log(this.fName); // => method invocation this == Obj(obj1)
    function test2() {
      console.log(this.fName); //undefined
    }

    const test3 = () => {
      console.log(this.fName); // => arrow function resolve the context
    };

    test2(); // => function invocation this == Context(window)
    test3();
  },
};

obj1.test1();
```
