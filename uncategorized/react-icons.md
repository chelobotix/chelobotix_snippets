# React Icons

```typescript
interface Item {
    icon: JSX.Element
}


// crating the object

import { GiSoccerKick } from '@react-icons/all-files/gi/GiSoccerKick'
import { type Item } from './types/ItemInterface'

function App(): JSX.Element {
    const items: Item[] = [
        {
            icon: <GiSoccerKick />,
        },
    ]
```
