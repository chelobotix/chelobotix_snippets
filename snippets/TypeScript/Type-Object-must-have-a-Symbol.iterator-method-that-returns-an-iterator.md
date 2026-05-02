# Type Object must have a Symbol.iterator method that returns an iterator

```typescript
//Wrapping the object in an array

const obj = { name: 'Bobby Hadz' };

const result = [...[obj]];

console.log(result); // 👉️ [{name: 'Bobby Hadz'}]
```
