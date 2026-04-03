# First Render

```javascript
function MyComponent() {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (flag) {
      // Your code here for all renders except the first render
      console.log('Effect triggered!');
    } else {
      setFlag(true);
    }
  }, [flag]);

  return <div>My Component</div>;
}

export default MyComponent;
```
