# Single Page Application (SPA) Routing Netlify

Ve al archivo netlify.toml en la raíz de tu proyecto. Si no tienes este archivo, puedes crearlo.

Agrega la siguiente configuración al archivo netlify.toml


```ini
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
