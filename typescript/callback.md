# Callback

```typescript
type Callback = () => void;

const functionWithCallback = (callback: Callback): void => {
  callback();
};

//rest of the code...
const callback1 = (): void => {
  console.log('works');
};

functionWithCallback(callback1);
```
