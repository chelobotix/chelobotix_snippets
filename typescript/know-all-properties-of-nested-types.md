# Know all properties of Nested types

```typescript
interface IPerson {
    name: string
    age: number
}

type NestedType1 = IPerson & {
    isDeveloper: boolean
    language: string
}

type NestedType2 = NestedType1 & {
    isSuperHero: boolean
}

type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

type idk = Prettify<NestedType2>
// type idk = {
//     name: string;
//     age: number;
//     isDeveloper: boolean;
//     language: string;
//     isSuperHero: boolean;
// }
```
