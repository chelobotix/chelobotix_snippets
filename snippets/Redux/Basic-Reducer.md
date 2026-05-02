# Basic Reducer

```typescript
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type ISearch } from '../../types/SearchInterface'

type PropertyAction = Record<string, string>

const initialState: ISearch = {
    name: null,
    brand: null,
    gender: null,
}

/* ---------------------------------- Slice --------------------------------- */
const SearchSlice = createSlice({
    name: 'Search',
    initialState,
    reducers: {
        // use return keyword if you need to mutate all state
        includeInSearch: (state, action: PayloadAction<PropertyAction>) => {
            return { ...state, ...action.payload }
        },
        // if you need to update just one property make it without return
        includeInSearch: (state, action: PayloadAction<any>) => {
            state.brand = action.payload
        },
    },
})

export const { includeInSearch } = SearchSlice.actions
export default SearchSlice.reducer

```

```

```
