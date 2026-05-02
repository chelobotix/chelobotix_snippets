# Flag Redux

```javascript
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from '../App/MoreComplex/moreComplexSlice'
import { useEffect, useState } from 'react'

const Flag = () => {
    const { user } = useSelector((state) => state.moreComplex)
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (flag) {
            console.log('Todos los dispatch completados')
            console.log('🚀 ~ file: MoreComplex.jsx:6 ~ MoreComplex ~ user:', user)
        } else {
            dispatch(addUser({ name: 'Reinish' }))
            dispatch(addUser({ age: 5 }))
            dispatch(addUser({ userId: 34 }))
            setFlag(true)
        }
    }, [flag])

    return (
        <div>
            <h3>Flag</h3>
            <p>{user.userId}</p>
            <p>{user.name}</p>
            <p>{user.age}</p>
        </div>
    )
}

export default Flag
```
