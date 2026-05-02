# Max value in array

```javascript
// For large data, it's better to use reduce. Supose arr has a large data in this case:
const arr = [1, 5, 3, 5, 2];
const max = arr.reduce((a, b) => { return Math.max(a, b) });

// For arrays with relatively few elements you can use apply: 
const max = Math.max.apply(null, arr);

// or spread operator:
const max = Math.max(...arr);
```
