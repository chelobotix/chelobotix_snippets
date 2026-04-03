# Middleware

```shell
# If it applies to every request, middleware is your tool
```

```ruby
# Basic
class RequestTimer
  def initialize(app)
    @app = app
  end

  def call(env)
    start_time = Time.now
    status, headers, response = @app.call(env)
    duration = ((Time.now - start_time) * 1000).round(2)
    Rails.logger.info "⏱ Request took #{duration}ms"
    headers["X-Request-Duration"] = "#{duration}ms"
    [status, headers, response]
  end
end
```


```shell
#ver lista de middlewares con su orden de ejecucion
rails middleware
```
```ruby
# Crear un middleware
#1
#Crear el middleware en lib/middleware/tu_middleware.rb
class TuMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    puts(Rainbow('============ Middleware! ============').bg(:yellow))
    @app.call(env)
  end
end
  
#2
#En config/application.rb
require_relative '../lib/middleware/nova_xenvio_middleware'
config.middleware.insert_before 0, TuMiddleware
# o
# Añadir un middleware específicamente antes de otro middleware existente
config.middleware.insert_before AnotherMiddleware, Middleware::SecondMiddleware

# o
config.middleware.use Middleware::LastMiddleware

```

```ruby
# sacar los datos del request
def call(env)
  request = Rack::Request.new(env)
  base_url = request.base_url
  # Puedes usar base_url aquí
  @app.call(env)
end



# HTTP RESPONSE
[
    400,
    { 'Content-Type' => 'application/json' },
    [{ status: 400, error: 'No token provided.' }.to_json]
]


# GUADAR VARIABLE DE ENTORNO
# Middleware
env['NG_REQUEST'] = true
# Controller - Action
request.env['NG_REQUEST']

```
