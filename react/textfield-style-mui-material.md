# TextField Style Mui Material

```javascript
//v5

import { styled } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { inputLabelClasses } from '@mui/material/InputLabel';

const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'green',
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'red',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: 'purple',
  },
  [`& .${outlinedInputClasses.input}`]: {
    color: 'green',
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: 'red',
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
    color: 'purple',
  },
  [`& .${inputLabelClasses.outlined}`]: {
    color: 'green',
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: 'red',
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: 'purple',
  },
});


return (
    <StyledTextField id="outlined-basic" label="Comments" variant="outlined" inputName={'comment'} multiline rows={4} required />
)



```
