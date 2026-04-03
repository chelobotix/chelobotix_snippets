# Block Ruby

```ruby
# Si quieres ejecutar un Bloque dentro de un metodo lo unico que tienes que hacer es poner lo que quieras ejecutar dentro de un do luego de la llamada al metodo y dentro del metodo poner yield para llamarlo en el lugar que quieras.
```

```ruby
# PASANDO UN BLOQUE Y LLAMANDOLO CON YIELD

def do_something_with_an_arg
  puts "Hi!"
  yield("Hello World") if block_given?
  puts "Bye!"
end

do_something_with_an_arg do |message|
  puts "The message is #{message}"
end

# =>
# Hi!
# The message is Hello World
# Bye!
```


```ruby
# PASANDO UN BLOQUE
def execute_two_times(&block)
  block.call
  block.call
end

execute_two_times do
  puts "Calling the block!"
end

# =>
# Calling the block!
# Calling the block!
```
