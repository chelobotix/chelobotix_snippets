# Children

```typescript
//Parent
return (       
          <Children color="blue">
              <h3>Children</h3>
          </Children>
    		 )

//Child
interface ChildProps {
    color: string
    children: JSX.Element[] | JSX.Element
}

const Children: React.FC<ChildProps> = ({ color, children }) => {
    return (
        <div>
            <h2 style={{ color }}>Works!</h2>
            {children}
        </div>
    )
}
```
