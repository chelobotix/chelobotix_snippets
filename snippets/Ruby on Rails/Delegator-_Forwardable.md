# Delegator - Forwardable

```ruby
# Concepto General Ruby: Se usa para delegar la ejecución de un método a otra clase u objeto. 
```


```ruby
# Relacion de (1 a n) se usa en el modelo N
# Relacion de (1 a 1) se usa en cualquier modelo

#Modelo Book
delegate :first_name, :last_name, to: :author, prefix: true, allow_nil: true

# Sin Delegate
book.author.first_name

# Con Delegate
book.author_first_name

```


```ruby
require 'forwardable'

class Foo
  def testo
    "Método testo ejecutado desde Foo"
  end
end

class Bar
  extend Forwardable
  
  # Delegamos el método :testo a la instancia @foo
  def_delegators :@foo, :testo

  def initialize(foo)
    @foo = foo
  end
end

# Ejemplo de uso
foo = Foo.new
bar = Bar.new(foo)
puts bar.testo  # => "Método testo ejecutado desde Foo"
```
