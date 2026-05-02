# Leter opener  gem

```ruby
#enviroment/development.rb
config.action_mailer.default_url_options = { host: 'http://127.0.0.1', port: 3000 }
  config.action_mailer.delivery_method = :letter_opener
  config.action_mailer.perform_deliveries = true
  
  
  
# Para usar en Development substituir
# config/initializers/setup_mail.rb
ActionMailer::Base.delivery_method = :letter_opener

```

> gem('letter_opener', group: :development)
gem('letter_opener_web', '~> 2.0')
