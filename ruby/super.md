# Super

```ruby
# Sobreescribir un metodo de super y pasar un bloque. esto ejecutara el metodo Super y tambien el codigo que se le pase
class User
  def test1
    puts "test1"
    yield if block_given?
  end
end

class Student < User
  def test1
    super do
      puts "fabuloso"
    end
  end
end

obj1 = Student.new
obj1.test1
# resultado:
#test1
#fabuloso




# lo mismo pero con argumentos, MAS PODEROSO!
class User
  def test1
    puts "test1"
    yield "John" if block_given?  # Pasando "John" como argumento al bloque
  end
end

class Student < User
  def test1
    super do |name|
      puts "#{name} es fabuloso"  # Usando el argumento en el bloque
    end
  end
end

obj1 = Student.new
obj1.test1
```
