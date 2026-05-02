# Mui Material Media Query

```typescript
import React from 'react';
import Button from '@mui/material/Button';
import { useMediaQuery, createTheme } from '@mui/material';

const theme = createTheme();

const App = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          variant="contained"
          color={isSmallScreen ? 'primary' : 'secondary'}
        >
          {isSmallScreen ? 'Primary Color' : 'Secondary Color'}
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
```
