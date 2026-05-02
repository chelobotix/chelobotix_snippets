# Scroll Event

```javascript
function App() {

  useEffect(() => {
  
    const handleScroll = event => {
      console.log('window.scrollY', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return //todo;
}
```
