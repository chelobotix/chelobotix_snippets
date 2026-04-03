# TanStack React Query Basic

## Fragment 1: Main

npm i @tanstack/react-query
npm i @tanstack/react-query-devtools

```typescript
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <App />
        </QueryClientProvider>
    </React.StrictMode>
)

```

## Fragment 2: Basic

```typescript
import { useQuery } from '@tanstack/react-query'

const url = 'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
const getRandomNumber = async (): Promise<number> => {
    const response = await fetch(url)
    const number = await response.text()
    // throw new Error('could not be loaded :x')
    return +number
}


const App = (): JSX.Element => {
    const query = useQuery({
        queryKey: ['randomNumber'],
        queryFn: getRandomNumber,
        retry: 2,
        staleTime: 1000 * 60 * 60, //volver a fetchear cada hora
        placeholderData: [
            {
                id: 69105358,
                node_id: 'MDU6TGFiZWw2OTEwNTM1OA==',
                url: 'https://api.github.com/repos/facebook/react/labels/Browser:%20Safari',
                name: 'Browser: Safari',
                color: 'c7def8',
                default: false,
            },
            {
                id: 196858374,
                node_id: 'MDU6TGFiZWwxOTY4NTgzNzQ=',
                url: 'https://api.github.com/repos/facebook/react/labels/CLA%20Signed',
                name: 'CLA Signed',
                color: 'e7e7e7',
                default: false,
            },
        ],
    })
    return (
        <>
            {query.isFetching ? (
                <h2>Loading...</h2>
            ) : query.isError ? (
                <h3>Error: {query.error.message}</h3>
            ) : (
                <h2>Numero Aleatorio: {query.data}</h2>
            )}

            <button onClick={() => query.refetch()} disabled={query.isFetching}>
                {query.isFetching ? '...' : 'New number'}
            </button>
        </>
    )
}

export default App
```

## Fragment 3: UseQuery



## Fragment 4: Pre Fetch

```javascript
const handleOnMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['issue', issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 10000,
    });
  };
```
