# *arg *options kwargs

```ruby
def metodo(*args, **options)
  puts "Positional args: #{args.inspect}" # => Positional args: ["Laura", 32]
  puts "Keyword options: #{options.inspect}"  # => Keyword options: {:activo=>true, :admin=>true}

  # Ejemplo de extracción específica
  nombre = args[0]
  edad = args[1]
  activo = options[:activo]
  admin = options.fetch(:admin, false)
end


metodo("Laura", 32, activo: true, admin: true)

```
