# Provide

```ruby
- provide(:key, 'value')

= yield(:key)

# Ejemplito

- provide(:title, "#{params[:controller].titleize} | #{params[:action].titleize}" )
  %title=  yield(:title)
```
