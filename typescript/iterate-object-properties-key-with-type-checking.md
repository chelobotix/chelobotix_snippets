# Iterate Object Properties (key) with Type Checking

```typescript
interface IUser {
    id: number | null
    name: string | null
    age: number | null
}

const users: IUser[] = [
    {
        id: 2,
        name: 'Bebish',
        age: 4,
    },
    {
        id: 2,
        name: 'Bebish',
        age: 4,
    },
]

// BEST WAY
function isKey<T extends object>(
  x: T,
  k: PropertyKey
): k is keyof T {
  return k in x;
}
 
 
// Way #1
{Object.keys(users).map((user) => <p>{keywords[keyword as keyof IUser]}</p>


// Way #2
{Object.entries(users).map((user) => <p>{`${user[0]}, ${user[1]}`}</p>
))}


// Way #3
(Object.keys(users) as Array<keyof typeof users>).map((user) => users[user])



// EXTRA
// This gives an error
const temp = someObj[field];

// Solution 1: When the type of the object is known
const temp = someObj[field as keyof ObjectType]

// Solution 2: When the type of the object is not known
const temp = someObj[field as keyof typeof someObj]
```
