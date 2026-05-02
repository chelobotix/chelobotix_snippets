# Redux Typescript

```typescript
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { type IWatches } from '../../types/WatchesInterface'
import { type IBrands } from '../../types/BrandsInterface'

interface GlobalWatchState {
    watchesData: IWatches | null
    brandsData: IBrands | null
    isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | undefined
}

const initialState: GlobalWatchState = {
    watchesData: null,
    brandsData: null,
    isLoading: 'idle',
    error: undefined,
}

/* ---------------------------------- Fetch --------------------------------- */
// Fetch Watches Data
const fetchWatchesGet = createAsyncThunk('fetchWatchesGet', async (fetchProps: { url: string; target: string }) => {
    const { url, target } = fetchProps
    try {
        const response = await fetch(url)
        const json = await response.json()
        const data = await json
        return { response: await data, target }
    } catch (error) {
        console.log(error)
        throw error
    }
})

/* ---------------------------------- Slice --------------------------------- */
const WatchSlice = createSlice({
    name: 'Person',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWatchesGet.pending, (state) => {
            state.isLoading = 'loading'
        })

        builder.addCase(fetchWatchesGet.fulfilled, (state, action: PayloadAction<any>) => {
            switch (action.payload.target) {
                case 'watches':
                    state.watchesData = action.payload.response
                    break
                case 'brands':
                    state.brandsData = action.payload.response
                    break
                default:
                    break
            }
            state.isLoading = 'succeeded'
            // state.watchesData = action.payload
        })

        builder.addCase(fetchWatchesGet.rejected, (state, action) => {
            state.isLoading = 'failed'
            state.error = action.error.message
        })
    },
})

export { fetchWatchesGet, type GlobalWatchState }
export default WatchSlice.reducer
```

```javascript
import { configureStore } from '@reduxjs/toolkit'
import watchReducer from './watchSlice'
import searchReducer from './searchSlice'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
    reducer: {
        watch: watchReducer,
        search: searchReducer,
    },
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

```

```

```
