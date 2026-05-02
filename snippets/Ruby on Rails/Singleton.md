# Singleton

```ruby
# Sigleton usan initializer sin argumentos!
class AngularAuthService
  include Singleton

  def initialize
    @current_user = User.current
  end

  def call
    puts @current_user
  end
end

# Controlador
AngularAuthService.instance.call # Esta llamara el initializer
AngularAuthService.instance.call # Esta ya no llamara el initializer




#
```

```ruby
# Si quires pasar parametros en el initializer pudes hacer asi:
class AngularAuthService
  include Singleton

  def initialize(foo)
    if @initialized
      raise "This singleton has already been initialized"
    end
    @foo = foo
    @initialized = true
  end

  def call
    puts @current_user
  end
end

# Controlador
object = AngularAuthService.instance('test') # Esta llamara el initializer
object.call
object2 = AngularAuthService.instance # Esto lanzara el error




#
```
