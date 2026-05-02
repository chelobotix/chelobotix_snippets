# Cache Ruby on Rails

```ruby
# CONFIGURATION

# config/environments/production.rb
config.cache_store = :redis_cache_store, {
  url: ENV.fetch("REDIS_URL") { "redis://localhost:6379/1" },
  expires_in: 1.hour,
  reconnect_attempts: 3,
  race_condition_ttl: 5,
  namespace: 'CACHE'
}


```


```ruby
# LOW_LEVEL CACHING (Rails.cache)

Rails.cache.fetch("top_users", expires_in: 15.minutes) do
  User.order(score: :desc).limit(10).to_a # => .to_a SIEMPRE PARA QUE EJECUTE EL QUERY SI ES "LAZY" 
end
```

```ruby
# API RESPONSE
Rails.cache.fetch("github_user_#{username}", expires_in: 30.minutes) do
  ExternalApi.fetch_user(username)
end
```

```ruby
# RUSSIN DOLL - MATRYOSHKA DOLLS

def show
  post = Post.find(params[:id])

  # Russian Doll Caching
  cached_post = Rails.cache.fetch(post.cache_key_with_version, expires_in: 10.minutes) do
    {
      id: post.id,
      title: post.title,
      content: post.content,
      comments: post.comments.map do |comment|
        Rails.cache.fetch(comment.cache_key_with_version, expires_in: 5.minutes) do
          {
            id: comment.id,
            content: comment.content,
            likes_count: comment.likes.count
          }
        end
      end,
      likes: post.likes.map do |like|
        Rails.cache.fetch(like.cache_key_with_version, expires_in: 5.minutes) do
          { id: like.id, user_id: like.user_id }
        end
      end
    }
  end

  render json: cached_post
end


# SERIALIZER
class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content

  has_many :comments
  has_many :likes

  # Russian Doll Cache: post cache independiente
  cache key: 'post', expires_in: 10.minutes
end

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content
  
  cache key: 'comment', expires_in: 5.minutes
end

class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id
  
  cache key: 'like', expires_in: 5.minutes
end



```


```ruby
1. instalar gem dalli
2. application.rb
config.cache_store = :mem_cache_store
3. En enviroment/development si quieres usar un memcached real puedes comentar lo siguiente:
config.cache_store = :memory_store
4. En terminal correr: rails dev:cache


# para un view
= cache 'current_time', expires_in: 1.minute do
  = Time.current


# para un controlador
@matrix =
      Rails.cache.fetch('movie_matrix', expires_in: 20.seconds) do
        Movie.find_by(name: 'The Chelo')
      end
      
      
      


```


```ruby

# REDIS
1. development.rb
config.cache_store = :redis_cache_store,{
      url: ENV['REDIS_URL'] || 'redis://localhost:6379/0', # configura la bd numero 0
      namespace: 'cache' # aumentara la palabra cache a todas las keys: cache:mykey
    }

2. en el controlador, si no encuentra la clave procede a realizar el query.
triggers =
        Rails.cache.fetch('cache:trigger#index', expires_in: 30.days) do
          Trigger.includes(:trigger_rule_actions, :rule_actions, :nodes).all.order(:id)
        end



# VERIFICAR QUE CACHE SE ESTA USANDO
Rails.cache.class.name

# VERIFICAR DESDE LA CONSOLA DE RAILS
Rails.cache.write("redis_test_key", "funciona", expires_in: 1.minute)
Rails.cache.read("redis_test_key")

# LIMPIAR TODO
Rails.cache.clear

```


```ruby
# Recuperar de Redis como Active Record
redis_cache = REDIS.get(code)
TuModelo.instantiate(JSON.parse(redis_cache))

```

> https://www.speedshop.co/2015/07/15/the-complete-guide-to-rails-caching.html

https://railsdrop.com/2012/04/02/rails-memcached-and-dalli-gem/

https://www.engineyard.com/blog/rails-5-2-redis-cache-store/

```ruby
# CACHE INVALIDATION

# AUTOMATIC ***
# Single object
post = Post.find(23)

Rails.cache.fetch("posts/#{post.cache_key_with_version}", expires_in: 10.minutes) do
  Post.includes(:comments, :likes).find(23) # heavy queary
end

# ActiveRecord::Relation
posts = Post.limit(10)

Rails.cache.fetch("posts/#{posts.cache_key}", expires_in: 10.minutes) do
  posts.includes(:comments, :likes).limit(10) # heavy queary
end


# MANUAL
Rails.cache.delete("top_users")

# TOUCHING RECORDS (Cuando se crear, actualiza o elimina un comment el campo updated_at del post se actualizara automaticamente)
class Comment < ApplicationRecord
  belongs_to :post, touch: true
end

```


```ruby
# WITH DB CALLBACK

class Product < ApplicationRecord
  after_commit :invalidate_price_cache, if: :saved_change_to_price?
  
  def invalidate_price_cache
    CacheInvalidator.clear_product_price(id)
  end
end


class CacheInvalidator
  def self.clear_product_price(product_id)
    Rails.cache.delete("product:#{product_id}:price")
  end
end



.
```



```ruby
# JOB VERIFICADOR
class CacheConsistencyCheckJob
  SAMPLE_SIZE = 100
  STALE_THRESHOLD = 5.0 # porcentaje permitido de inconsistencia

  def self.run
    stale_count = 0

    # Tomamos una muestra aleatoria de productos
    Product.order("RANDOM()").limit(SAMPLE_SIZE).each do |product|

      # Leemos el precio guardado en cache
      cached_price = Rails.cache.read("product:#{product.id}:price")

      # Si existe cache y es distinto al valor real en DB, contamos inconsistencia
      if cached_price && cached_price != product.price
        stale_count += 1
      end
    end

    # Calculamos porcentaje de datos stale
    stale_percentage = (stale_count.to_f / SAMPLE_SIZE) * 100

    # Si supera el límite, disparamos alerta
    if stale_percentage > STALE_THRESHOLD
      alert_ops(stale_percentage)
    end
  end

  def self.alert_ops(stale_percentage)
    Rails.logger.warn("Cache inconsistency detected: #{stale_percentage}% stale")
  end
end
```

