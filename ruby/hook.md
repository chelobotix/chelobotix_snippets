# Hook

```ruby
# Un hook es un método no abstracto definido en una clase base que puede ser sobrescrito opcionalmente por las clases concretas. Su propósito es permitir a las subclases modificar o extender partes del comportamiento sin alterar la estructura principal del algoritmo.
```

```ruby
module AbstractClass
  def template_method
    base_operation1
    hook1   # <-- Hook: la subclase puede personalizarlo
    base_operation2
  end

  def base_operation1
    puts 'Doing base work'
  end

  def base_operation2
    puts 'Doing more base work'
  end

  def hook1
    # Hook vacío, puede ser sobrescrito
  end
end

```
