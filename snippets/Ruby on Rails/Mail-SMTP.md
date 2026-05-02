# Mail SMTP

```ruby
# initializers/setup_mail.rb
ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
	:address              => 'smtp.gmail.com',
	:port                 => '587',
	:user_name            => 'marcelo.alarcon@shipedge.com',
	:password             => 'consultar en local',
	:authentication       => 'plain',
	:enable_starttls_auto => true
  }
  
  # enviroment/development.rb
  
  # Mail Config
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.perform_caching = false
  config.action_mailer.perform_deliveries = true
  config.action_mailer.default_url_options = { :host => "x5.shipedge.com" }
  

xenvio-no-reply@shipedge.com
# xenvio_mail_v1
# consultar en local


```


```ruby
# https://app.mailjet.com/dashboard
# app/mailers/test_mailer.rb
class TestMailer < ApplicationMailer
  default from: 'railsgeniusweb@gmail.com'
  def new_test
    mail(
      to: 'marceloalarconbarrenechea@gmail.com',
      subject: 'New comment on post',
      content_type: 'text/html'
    )
  end
end

# config/initializers/setup_mail.rb
ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  :address              => 'in-v3.mailjet.com',
  :port                 => '587',
  :user_name            => '212c9f8bad415b3fd1eb8715c97ca004',
  :password             => 'consultar en local',
  :authentication       => 'plain',
  :enable_starttls_auto => true
}

# config/environments/development.rb
config.action_mailer.raise_delivery_errors = true
config.action_mailer.perform_caching = false
config.action_mailer.perform_deliveries = true

config.action_mailer.default_url_options = { host: 'http://127.0.0.1', port: 3000 }
config.action_mailer.delivery_method = :smtp

```




> https://myaccount.google.com/apppasswords
