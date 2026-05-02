# Equal?

```ruby
# Comparaciones en Ruby

a = "hello"
b = "hello"
c = a

# 1. equal? - Compara identidad de objeto (misma referencia en memoria)
puts a.equal?(b) # false (diferentes objetos con el mismo contenido)
puts a.equal?(c) # true (mismo objeto en memoria)

# 2. == - Compara valores
puts 5 == 5 # true
puts "hello" == "hello" # true
puts [1,2,3] == [1,2,3] # true

# 3. eql? - Compara valores y tipos
puts 5.eql?(5) # true (ambos Fixnum)
puts 5.eql?(5.0) # false (Fixnum vs Float)
puts "hello".eql?("hello") # true (ambos String)

# 4. === - Comparación flexible en case, rangos y regex
puts (1..10) === 5 # true (5 está en el rango)
puts /hello/ === "hello world" # true (regex coincide)
puts String === "hello" # true ("hello" es un String)

```
