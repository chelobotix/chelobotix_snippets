# How do I access Material-ui's theme in Styled Component

```javascript
If you want to use both ThemeProviders, first from styled-components and second from material-ui, you can use alias for one of them:

import { ThemeProvider as StyledThemeProvider} from 'styled-components';
import { ThemeProvider } from '@material-ui/core/styles';

 function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Wrapper>
          <TheHeader />
          <TheContent />
          <TheFooter />
        </Wrapper>
      </StyledThemeProvider>
      </ThemeProvider>
    </Router >
  );
}

export default App;
```
