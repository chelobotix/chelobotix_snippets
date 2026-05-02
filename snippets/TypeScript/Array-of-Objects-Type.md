# Array of Objects Type

```typescript
interface IOptions {   
    gender: Array<{ value: string; label: string }>
}

const options: IOptions = {
    gender: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
    ],
}
```
