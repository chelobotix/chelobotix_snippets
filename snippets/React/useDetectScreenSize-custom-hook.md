# useDetectScreenSize custom hook

```typescript
import { createTheme, useMediaQuery } from '@mui/material'

const useDetectScreenSize = (): boolean => {
    const theme = createTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    return isSmallScreen
}

export { useDetectScreenSize }
```
