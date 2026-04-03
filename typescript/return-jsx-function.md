# Return JSX function

//* Dont complicate your self ;) ....

```typescript
const finalWay = (): JSX.Element => {
        const array: string[] = ['hi', 'bye']
        return (
            <>
                {array.map((item) => (
                    <li key={Date.now()}>{item}</li>
                ))}
            </>
        )
    }

    return (
        <div>
            <ul>{finalWay()}</ul>
        </div>
    )
```
