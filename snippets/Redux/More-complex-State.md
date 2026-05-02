# More complex State

```javascript
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: { userId: null, name: null, age: null },
    isCompleted: false,
}

const moreComplexSlice = createSlice({
    name: 'moreComplexSlice',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }
            state.isCompleted = true
        },
    },
})

export const { addUser } = moreComplexSlice.actions
export default moreComplexSlice.reducer
```

```javascript
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from '../App/MoreComplex/moreComplexSlice'
import { useEffect } from 'react'

const MoreComplex = () => {
    //! dispatch es sincrono pero cuando se cambia el estado de user, el renderizado de React es asincrono
    const { user, isCompleted } = useSelector((state) => state.moreComplex)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(addUser({ name: 'Reinish' }))
        //! console.log(user) por eso que aca no muestra todavia los cambios
    }

    useEffect(() => {
        if (isCompleted) {
            console.log('🚀 ~ file: MoreComplex.jsx:6 ~ MoreComplex ~ user:', user)
        }
    }, [isCompleted])

    return (
        <div>
            <button onClick={handleClick}>Load User Data (sync)</button>
            {isCompleted ? <p>Completed</p> : <p>Uncompleted</p>}
            <p>{user.name}</p>
        </div>
    )
}

export default MoreComplex
```
