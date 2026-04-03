# keyof

```javascript
interface IPerson {
  name: string;
  age: number;
}

const person: IPerson = {
  name: 'John',
  age: 30,
};

// Basic
type personKeys = keyof IPerson

// Generic Object Function
const genericObject = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

const myname = getKey(person, 'name');

// Example #2 Specific Object Function
const specificObject = (person: IPerson, key: keyof IPerson): IPerson[keyof IPerson] => {
  return person[key];
};
const myname = getKey(person, 'name');

// Make IPerson properties optional
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type OptionalPerson = Optional<IPerson>; // equivalent to { name?: string; age?: number }

// keyof typeof - it uses when we dont know the type of the object
const obj = {brand: 'BMW', year: 1967}
type objKeys = keyof typeof obj     // type objKeys = "brand" | "year"



```
