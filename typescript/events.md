# Events

```typescript
//* onChange
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(event.target)
    }

    //* onClick
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        console.log(event.target)
    }

    //* onDrag
    const handleDrag = (event: React.DragEvent<HTMLDivElement>): void => {
        console.log(event.clientX)
    }
    
    //* Keyboard
    const handleKeyDown = (e: React.KeyboardEvent): void => {}
```
