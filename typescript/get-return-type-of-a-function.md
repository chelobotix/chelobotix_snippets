# Get return type of a function

```typescript
// Normal
const test = () => {
    const value = 'Hello'
    return value
}

type Return = ReturnType<typeof test>


//Async
const test = async() => {
    const value = 'Hello'
    return value
}

type Return = Awaited<ReturnType<typeof test>>
```
