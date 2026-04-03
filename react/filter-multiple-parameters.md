# Filter Multiple Parameters

```javascript
const targets = ['red', 'orange'];
const obj = [
  {
    name: 'jean',
    color: 'blue',
  },
  {
    name: 'sock',
    color: 'orange',
  },
  {
    name: 'suite',
    color: 'black',
  },
  {
    name: 'tie',
    color: 'red',
  },
];

const result = obj.filter((clothe) => targets.includes(clothe.color));
console.log(result);
```
