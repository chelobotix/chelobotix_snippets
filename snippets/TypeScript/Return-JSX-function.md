# Return JSX function

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

> //* Dont complicate your self ;) ....
