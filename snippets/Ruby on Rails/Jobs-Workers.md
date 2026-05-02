# Jobs Workers

```ruby
# config/application.rb
config.active_job.queue_adapter = :sidekiq
```

```ruby
# TERMINAL
rails jobs:work
```

```ruby
# GENERATE
rails generate job webhook
ImportShipmentJob.perform_later(@channel_request) if @channel_request.aasm_state == 'waiting'
```

```ruby
# KILL ALL ENQUEUE JOBS
Delayed::Job.delete_all
```

