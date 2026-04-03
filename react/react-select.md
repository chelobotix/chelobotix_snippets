# React Select

sudo npm i --save react-select

```javascript
import style from './ReactSelect'
import Select, { components } from 'react-select'
import { useState } from 'react'

//this format is mandatory
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'banana', label: 'Banana' },
    { value: 'passion', label: 'Passion Fruit' },
]

// option to 3# select
const Option = (props) => {
    return (
        <div>
            <button>
                <components.Option {...props} />
            </button>
        </div>
    )
}

// add button at the end of the 4# list
const AddButton = (props) => {
    return (
        <components.MenuList {...props}>
            {props.children}
            <button>Save</button>
        </components.MenuList>
    )
}

const ReactSelect = () => {
    const [text1, setText1] = useState(null)
    const [text2, setText2] = useState(null)

    const handleMultiple = (e) => {
        console.log(e) // Array of objects
        setText2(e)
    }

    return (
        <div className="App">
            <h3 className={`${style.heading}`}>Single</h3>
            <Select
                options={options}
                onChange={(itemSelected) => setText1(itemSelected.label)}
                onMenuOpen={() => console.log('open')}
                onMenuClose={() => console.log('close')}
            />
            {text1 ? <p>{text1}</p> : <p>Nothing here</p>}
            <hr />

            <h3>Multi</h3>
            <Select isMulti defaultValue={[options[2], options[5]]} options={options} onChange={handleMultiple} />
            {text2 ? text2.map((item, index) => <p key={index}>{item.label}</p>) : <p>Nothing here</p>}
            <hr />

            <h3 className={`${style.heading}`}>Custom 1</h3>
            <Select components={{ Option }} options={options} closeMenuOnSelect={false} isMulti />
            <hr />

            <h3 className={`${style.heading}`}>Custom 2</h3>
            <Select components={{ MenuList: AddButton }} options={options} closeMenuOnSelect={false} isMulti />
            <hr />
        </div>
    )
}

export default ReactSelect

```
