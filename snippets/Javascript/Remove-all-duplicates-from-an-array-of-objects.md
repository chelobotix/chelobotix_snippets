# Remove all duplicates from an array of objects?

```typescript
import _ from 'lodash'

noDuplicatesArray = _.unionBy(array, 'name') // remove [{name: marce}, {name: marce}, {name: bebish}]
```
