# Lograge

```ruby
# config/initializers/lograge.rb
Rails.application.configure do
  config.lograge.enabled = true
  config.lograge.custom_options = lambda do |event|
    {
      request_id: event.payload[:request_id]
    }
  end
end
```


```ruby
# Overwrite in application_controller.rb
def append_info_to_payload(payload)
  super
  payload[:request_id] = request.request_id
end
```
