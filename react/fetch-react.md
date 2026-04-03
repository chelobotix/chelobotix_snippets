# Fetch React

## Fragment 1: Basic

```typescript
import { useEffect, useState } from 'react'

const url = 'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
const getData = async (): Promise<number> => {
    const response = await fetch(url)
    const number = await response.text()
    // throw new Error('could not be loaded :x')
    return +number
}

const App = (): JSX.Element => {
    const [number, setNumber] = useState<number>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()

    useEffect(() => {
        getData()
            .then(setNumber)
            .catch((error) => {
                setError(error.message)
            })
    }, [])

    useEffect(() => {
        if (number !== undefined) setIsLoading(false)
    }, [number])

    useEffect(() => {
        if (error !== undefined) setIsLoading(false)
    }, [error])

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error != null ? (
                <h3>Error: {error}</h3>
            ) : (
                <h2>Numero Aleatorio: {number}</h2>
            )}
        </>
    )
}

export default App

```

## Fragment 2: Re fetch

```typescript
import { useEffect, useReducer, useState } from 'react'

const url = 'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
const getData = async (): Promise<number> => {
    const response = await fetch(url)
    const number = await response.text()
    // throw new Error('could not be loaded :x')
    return +number
}

const App = (): JSX.Element => {
    const [number, setNumber] = useState<number>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()
    //lo unico que el reducer hace es aumentar en uno el numero que se reciba, no te compliques
    const [state, dispatch] = useReducer((x) => x + 1, 0)

    useEffect(() => {
        setIsLoading(true)
        getData()
            .then(setNumber)
            .catch((error) => {
                setError(error.message)
            })
    }, [state])

    useEffect(() => {
        if (number !== undefined) setIsLoading(false)
    }, [number])

    useEffect(() => {
        if (error !== undefined) setIsLoading(false)
    }, [error])

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error != null ? (
                <h3>Error: {error}</h3>
            ) : (
                <h2>Numero Aleatorio: {number}</h2>
            )}

            <button onClick={dispatch} disabled={isLoading}>
                {isLoading ? '...' : 'New number'}
            </button>
        </>
    )
}

export default App

```
