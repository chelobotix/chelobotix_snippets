# Credentials

```shell
# Production Setup
rails credentials:edit --environment production
rails db:migrate RAILS_ENV=production
rails assets:precompile RAILS_ENV=production

# Secret Management
rails secret                         # Generate secret key
rails credentials:show               # Show credentials
rails encrypted:edit config/master.key # Edit master key

# Cache Management
rails dev:cache                      # Toggle development caching
rails tmp:cache:clear                # Clear tmp cache
rails tmp:clear     

```

```ruby
#secrets.yml
Rails.application.secrets.gmail_app_key

```
```ruby
# SHOW credentials
rails credentials:show
#or in irb
Rails.application.credentials.config
```

```ruby
# GENERATE NEW credential
1. EDITOR="code --wait" rails credentials:edit

2. add new credentials

3. cerrar vscode

gmail_key: dc8af19c3ac...
```

```ruby
# Console
Rails.application.credentials.gmail_key
Rails.application.credentials.config
```

```ruby
# GENERATE WITH ENVIROMENT
EDITOR="code --wait" rails credentials:edit --environment development
```

```ruby
# MASTER KEY EN PRODUCTION
RAILS_MASTER_KEY
```

```ruby
# DATABASE PRODUCTION
production:
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: <%= ENV["PGHOST"] %>
  port: <%= ENV.fetch("PGPORT", 5432) %>
  database: <%= ENV["PGDATABASE"] %>
  username: <%= ENV["PGUSER"] %>
  password: <%= ENV["PGPASSWORD"] %>
  timeout: 5000
```


```ruby
Figaro.env.stamps_redirec_uri
```

> nice tutorial: https://web-crunch.com/posts/the-complete-guide-to-ruby-on-rails-encrypted-credentials
https://gist.github.com/db0sch/19c321cbc727917bc0e12849a7565af9
