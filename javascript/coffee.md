# Coffee

```javascript
// incluir un archivo coffee en una vista
= javascript_include_tag 'custom_view_script'


// Document ready
$(document).ready ->
  if $(".no-channels").length > 0
    $(".no-channels").click (event) ->
      event.preventDefault()
      event.stopPropagation()



// Function
saludar = (nombre) ->
  "Hola, #{nombre}!"
```
