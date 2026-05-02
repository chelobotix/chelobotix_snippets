# Spin animation

```css
//css
.loader {
  animation: spin-animation 1.5s infinite;
  display: block;
}

@keyframes spin-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(365deg);
  }
}
```

> import { FaSpinner } from 'react-icons/fa';
