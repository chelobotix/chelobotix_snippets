# Spaceship Operator <=>

```ruby
# Compara izquierda con derecha 
2 <=> 1    # => 1 
1 <=> 1    # => 0
1 <=> 2    # => -1
1 <=> "1"  # => nil
```

```ruby
# Usandolo con el modulo COMPARABLE
# Para que Comparable funcione, la clase debe definir el método <=>

class Person
  include Comparable  # Habilita los operadores de comparación basados en <=>
  attr_reader :name, :age # Debes dar acceso a AGE
  
  def initialize(name, age)
    @name = name
    @age = age
  end
  
  def <=>(other)
    self.age <=> other.age  # Compara personas por edad
  end
end


# CLIENT
p1 = Person.new("Alice", 25)
p2 = Person.new("Bob", 30)

puts p1 < p2   # true  (25 < 30)
puts p1 > p2   # false (25 > 30)
puts p1 == p2  # false (25 != 30)
```
