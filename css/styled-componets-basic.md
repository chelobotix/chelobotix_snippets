# Styled Componets Basic

## Fragment 1: Component1.tsx

sudo npm install styled-components @types/styled-components

```typescript
import { Component1Styled } from './Component1.styled'

const Component1: React.FC = () => {
    return (
        <>
            <Component1Styled color="#B6FFFA">
                <h1>koko</h1>
            </Component1Styled>

            <Component1Styled color="#0a60bd" isbutton="yes">
                <h1>koko</h1>
            </Component1Styled>
        </>
    )
}
export { Component1 }


```

## Fragment 2: Component1.styled.ts

```typescript
import styled, { css, keyframes } from 'styled-components'

interface Component1StyledProps {
    isbutton?: string
    color?: string
}

// global
const global = {
    color: {
        darkGreen: '#264653',
        lightGreen: '#2a9d8f',
    },
}

// function
const setTransition = (time: number): string => {
    return `all ${time}s ease-out`
}

// animation
const fadein = keyframes`
 0%{
    opacity: 0%;
 }

 100%{
    opacity: 1;
 }
`
// Styled Component
const Component1Styled = styled.div<Component1StyledProps>`
    display: flex;
    justify-content: center;
    background-color: ${global.color.darkGreen};
    transition: ${setTransition(0.5)};
    animation: ${fadein} 1s ease-in-out;

    &:hover {
        background-color: ${global.color.lightGreen};
    }

    ${({ isbutton }) =>
        isbutton === 'yes' &&
        css`
            width: 150px;
            border-radius: 25%;
            margin: 4px;
        `}

    h1 {
        color: ${(props) => props.color}; //${(props) => props.theme.colors.softGray};
    }
`

export { Component1Styled }


```
