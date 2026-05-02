# Gon

```ruby
1. en el archivo HAML
= include_gon

:javascript
  gon.variable1
  
2. en el controlador

def index
  gon.variable1 = "Dum dum!"
end
```
