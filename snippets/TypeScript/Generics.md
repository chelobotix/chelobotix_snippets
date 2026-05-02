# Generics

```typescript
// Basic
type object<T> = { 
    value: T 
};
const value1: object<number> = { value: 10 };
const value2: object<string> = { value: 'Bebish' };



//Default Value
type obj1<T = string> = {
  name: T | undefined;
};

const test1: obj1<number> = { name: 1 };
const test2: obj1 = { name: "Bebish" };
const test3: obj1 = { name: undefined };



// Functions
const makeArray = <T>(item: T[]): T[] => {
  return [T]
};
printAnything(123);
printAnything('bebish');



// As a React Props
interface IUserProps<T> {
    option: T[]
    value: T
}
const Component = <T>({options, value}):IUser<T> =>{
    return {}
}






```
