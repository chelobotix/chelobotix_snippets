# Read from Query String

```javascript
type IKeywords = Record<string, string>

const Users = () => {
	const [searchParams] = useSearchParams()
	const keywords: IKeywords = {}
	
  for (const entry of searchParams.entries()) {
    const [param, value] = entry;
    keywords[param] = value
  }

console.log(keywords)

};
```

> //Read from Query String
//?sort=name&order=ascending
