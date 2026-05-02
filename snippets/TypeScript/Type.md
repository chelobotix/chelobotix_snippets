# Type

```typescript
//Basic
type Address = string
const address: Address = "Av. Ecuador"

//Object
type MyType = {
  id: number;
  name: 'Bebish';
  friends: string[];
};

const Natish: MyType = { id: 1, name: 'Bebish', friends: ['Marce', 'Ali'] };

//Intersection
type MySuperType = MyType & {
    favoriteColors = string[]
}


```
