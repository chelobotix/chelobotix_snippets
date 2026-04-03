# Redux Component

```javascript
import { useAppSelector, useAppDispatch } from '../reducers/redux/store'

const Component = (): React.FC => {
    const { brandsData } = useAppSelector((state) => state.watch)
    const dispatch = useAppDispatch()
    
    ...
    
    

```
