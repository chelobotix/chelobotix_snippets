# React Props Functional Component

```typescript
// Example one
interface ChildProps {
    color: string
    onclickVoid: () => void
    returnMsg: (msg: string) => string
}

export const Child2: React.FC<ChildProps> = ({ color, onclickVoid, returnMsg }) => {
    return (
        <div>
            <h2 style={{ color }}>Works!</h2>
            <button onClick={onclickVoid}>click me</button>
            <button onClick={() => returnMsg('miau miau')}>click me</button>
        </div>
    )
}

// Example two
// Parent:
<Child {...user} />

//Child
const Child: React.FC<IUser> = (user) => {
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.age}</p>
        </div>
    )
}

// Example Three
// Parent:
<Child user={user} />

// Child:
const Child2: React.FC<{ user: IUser }> = ({ user }) => {
    return (
        <div>
            <p>{user.name}</p>
            <p>{user.age}</p>
        </div>
    )
}









```
