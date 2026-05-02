# Styled Componets Theme Provider

```typescript
import { UsingThemeStyled } from './UsingTheme.styled'
import { ThemeProvider } from 'styled-components'

const UsingTheme: React.FC = () => {
    const light = {
        color: '#03045e',
    }

    const dark = {
        color: '#00b4d8',
    }
    return (
        <>
            <ThemeProvider theme={light}>
                <UsingThemeStyled>
                    <h2>Hello</h2>
                </UsingThemeStyled>
            </ThemeProvider>

            <hr />

            <ThemeProvider theme={dark}>
                <UsingThemeStyled>
                    <h2>Hello</h2>
                </UsingThemeStyled>
            </ThemeProvider>
        </>
    )
}
export { UsingTheme }

```

```typescript
import styled from 'styled-components'

const UsingThemeStyled = styled.div`
    width: 150px;
    height: 50px;
    padding: 5px;
    background-color: ${(props) => props.theme.color};
    color: #ffffff;
`

export { UsingThemeStyled }

```
