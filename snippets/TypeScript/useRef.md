# useRef

```typescript
import { useRef } from 'react'

const Test: React.FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    return (
        <div>
            <input type="text" ref={inputRef} />
        </div>
    )
}
```
