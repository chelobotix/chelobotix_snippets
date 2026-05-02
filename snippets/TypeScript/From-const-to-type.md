# From const to type

```typescript
const person = {
    name: 'Bebish',
    age: 5,
    specifications: {
        weight: number
        hairColor: string
    }
}

type IPerson = typeof person
/*type IPerson = {
    name: string;
    age: number;
}*/


type KeyIPerson = keyof typeof person
//type KeyIPerson = "name" | "age"


type IPersonSpecifications = typeof person['specifications']
```
