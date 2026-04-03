# Events Rails Instrumentation API

https://www.writesoftwarewell.com/rails-instrumentation-api/

```ruby
# CREATE EVENT
ActiveSupport::Notifications.instrument('publish.new_movie', { title: 'NEW MOVIE EVENT!' }) do
  puts 'a new movie has been created'
end
```

```ruby
# SUBSCRIBE
ActiveSupport::Notifications.subscribe('publish.new_movie') do |name, started, finished, id, data|
  puts name
  puts started
  puts finished
  puts id
  puts data
end
```
