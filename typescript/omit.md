# Omit

```typescript
interface IPerson {
    id: number
    name: string
    age: number
}

const person = {
    id: number
    name: 'Bebish',
    age: 5,
}

type IPersonNoAge = Omit<IPerson, 'age'>
//or multiple
type IPersonNoAge = Omit<IPerson, 'age' | 'id'>
```
