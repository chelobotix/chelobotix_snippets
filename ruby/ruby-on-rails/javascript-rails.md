# Javascript Rails

```js
1. Create inside app/javascript/custom/yourFile.js
2. Add your custom JS
3. Use the javascript_include_tag helper at the end of your ERB view to include it:
   <%= javascript_include_tag 'custom/events.js' %>
   
```

```js
// PARA ACCEDER A LA VARIABLE DEL CONTROLADOR
var channel_request_id = '#{@channel_request.id}'; // Comillas simples
var channel_request_id = `#{@channel_request.id}`; // Template literals
```




```js
// acceder varialbles del hamls en JS
:javascript
  if (#{@order.shipments.count} == 0 && #{current_user.has_role?(:admin)}) {
        $('a.new_shipment_link')[0].click();
    }
    
```
