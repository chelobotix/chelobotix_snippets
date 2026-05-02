# API SWAGGER

```ruby
# install rspec
rails generate rspec:install
# install rswag
rails g rswag:install
# generate test
rails generate rspec:swagger Api::V1::ProductsController --spec_path integration
# generate document
rake rswag:specs:swaggerize
 
 
# correr todos menos swagger
rspec --exclude-pattern spec/requests/api/v1/*_spec.rb
rspec spec/services/*
 
```

> gem 'rswag'
group :development, :test do
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  gem 'rspec-rails'
end
