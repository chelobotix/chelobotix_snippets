# Local Storage Typescript

```typescript
import useLocalStorage from 'use-local-storage'
import { useRef } from 'react'

const LocalStorage: React.FC = () => {
    const [fruit, setFruit] = useLocalStorage<string>('fruit', '')
    const [names, setNames] = useLocalStorage<number[]>('names', [1, 2, 3])
    const [favorites, setFavorites] = useLocalStorage<any>('favorites', undefined) // delete the key

    const inputRef = useRef<HTMLInputElement | null>(null)

    return (
        <div>
            <h2>Local Storage</h2>
            <p>{fruit}</p>
            <input type="text" ref={inputRef} />
            <button onClick={() => setFruit(inputRef.current?.value)}>New Fruit Local Storage</button>
        </div>
    )
}
```

> sudo npm i use-local-storage
