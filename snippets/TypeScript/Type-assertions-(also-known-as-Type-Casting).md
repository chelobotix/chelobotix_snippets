# Type assertions (also known as Type Casting)

```typescript
interface IUser {
    id: number
    name: string
    age: number
}

const stringify = JSON.stringify([
    { id: 1, name: 'Marce', age: 41 },
    { id: 2, name: 'Natish', age: 5 },
])

const test1 = <IUser[]>JSON.parse(stringify)
const test2: IUser = JSON.parse(stringify)
const test3 = JSON.parse(stringify) as IUser
```
