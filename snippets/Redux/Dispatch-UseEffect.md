# Dispatch UseEffect

```typescript
import { useAppDispatch, useAppSelector } from '../../reducers/redux/store'
import { includeInSearch } from '../../reducers/redux/searchSlice'
import { useEffect } from 'react'

const Watches: React.FC = () => {
    const search = useAppSelector((state) => state.search)
    const { watchesData } = useAppSelector((state) => state.watch)
    const dispatch = useAppDispatch()
    
    
    //this fires first
    useEffect(() => {
        dispatch(includeInSearch({ key: 'brand', value: 'pigget' }))
    }, [dispatch])

    //this fires when state is update
    useEffect(() => {
        console.log(search)
    }, [search])

    return (
        <div>
            
        </div>
    )
}
```
