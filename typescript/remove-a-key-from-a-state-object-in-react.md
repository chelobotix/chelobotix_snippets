# Remove a Key from a state Object in React

```javascript
// Way 1
const handleClick = (key: keyof IUser): void => {
        const { [key]: propToDelete, ...rest } = keywords
        setkKeyword(rest)
}

// Way 2
const handleClick = (key: keyof IUser): void => {
        setkKeyword((current) => {
            // 👇️ remove the salary key from an object
            const { [key]: propToDelete, ...rest } = current
            return rest
        })
}



```
