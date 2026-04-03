# Partial

Required is the opposite of Partial

```typescript
//Example #1
interface IPerson {
    name: string
    age: number
}

const person = {
    name: 'Bebish',
    age: 5
}

const updatePerson = (person: IPerson, fieldsToUpdate: Partial<IPerson>):IPerson => {
    return { ...person, ...fieldsToUpdate }
}

updatePerson(person, {age: 6})
```
