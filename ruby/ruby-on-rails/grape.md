# Grape

## Fragment 1: Fragment

```ruby
1. create inside app api/api_name/api.rb
2. create class:
class API < Grape::API
  version 'v1', using: :path
  format :json
  prefix :api

  resource :movies do
    desc 'Obtener todas las películas'
    get do
      @movies = Movie.all
      puts @movies.inspect
      @movies
    end
  end
end


3. create route:
mount API => '/'

4. done



# SWAGGER REQUIRES NO
requires :name, type: String, desc: 'Name', documentation: { required: false }
```

## Fragment 2: error!

```ruby
# 422 Unprocessable Entity
{
    status: 'Error',
    code: 422,
    message: "Shipping method doesn't exist"
}, 422
```
