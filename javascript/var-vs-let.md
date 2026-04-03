# var vs let

```javascript
var x = 'global';
function test() {
  if (true) {
    var x = 'scope';
  }
  console.log(x); // we expect 'global' but returns 'scope'
}

test();
```
