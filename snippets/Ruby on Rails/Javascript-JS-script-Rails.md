# Javascript JS script Rails

```
1. Add controllers/myScript.js
2. call it from view1: = javascript_include_tag 'controllers/test'
3. add to assets pipeline: Rails.application.config.assets.precompile += %w( controllers/test.js )
4. restart server 




# Para jalar una varialb en create.js.haml desde la accion (siempre to_s)
console.log("#{j(@channel_request.id.to_s)}")
```
