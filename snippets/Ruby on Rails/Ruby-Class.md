# Ruby Class

```ruby
# class Person
class Person
  MY_CONSTANT = 'my data'.freeze
  private_constant :MY_CONSTANT
    
  attr_accessor :name
  
  def initialize(name)
    @name = name
    @@counter += 1
  end

  # class variable
  @@counter = 0

  # class method
  def self.class_method
    puts('class method')
  end

  # counter
  def self.counter
    @@counter
  end


  # method1
  def method1
    method2
  end

  # method2
  def method2
    puts('method 2')
  end

  protected

  # protected method
  def protected_method
    puts('this is private')
  end

  private

  # private method
  def private_method
    puts('this is private')
  end
end
```

```ruby
# FROM A STRING ####
# Basic
model = "Shipment"
object = model.constantize.find(id)


# Instantiate a class from a String  (suponte que quieres instanciar Foo:Bar::YourClass)
foo = const_get('Foo')
# foo.class  => module
clazz = foo.const_get('Bar').const_get('YourClass')
my_instance = clazz.new
my_instance.some_method


#Call instance method from string
foo = Foo.new
bar = "method1"
foo.send(bar)

#Para modelos
record = Shipment.find(1)
record.send("warehouse").send("name") => record.warehouse.name

# Para modelos anidados ("record.warehouse.name")
record = Shipment.find(1)
path = "record.warehouse.name"
methods = path.split('.')
current_object = record
methods[1..].each do |method|
  current_object = current_object.send(method)
end
if current_object == "warehouse_23"

# Simbolo operador 
shipment = Shipment.find(1)
operator = "=="
comparison_value = "warehouse_23"
field_value = shipment.name
if field_value.send(operator, comparison_value)
```


```ruby
#LLAMAR UN METODO PRIVADO DESDE UN METODO SELF (PRIVATE METHOD)
private
  def self.test23
   puts 'test'
  end
  private_class_method :test23
```


```ruby
# CREAR UNA CLASE ON THE FLY
Language = Class.new do
  define_method :interpret do
    puts "Interpreting the code"
  end
end

# Interpreting the code
Language.new.interpret
```


```ruby
# METHOD ON VARIABLES
animal = "cat"

def animal.speak
  puts self
end

animal.speak  # cat
```


```ruby
# BLOCK
# Mira el ejemplo es clarisimo cuando lo vas a usar. Tienes 20 configuraciones posibles, no vas a pasar todas por los parametros.
# La variable config se apsa por referencia

class MyClass
  def test
    config = { data_type: 'json' }

    yield(config) if block_given?

    puts(config)
  end
end



# Action

def index
  file_path = 'src/path/file.json'
  my_class = MyClass.new
  my_class.test do |configure|
    configure[:file_path] = file_path
  end

  my_class.test do |configure|
    configure[:extra_pop] = 'extra joys'
  end
end

# => {:data_type=>"json", :file_path=>"src/path/file.json"}
# => {:data_type=>"json", :extra_pop=>"extra joys"}
```


```ruby
# MODIFY ON THE FLY

# La clase entera (solo usas requiere y soreescribes lo que quieras)
# Make sure the original class is loaded
require 'british_text_object'
  # Now add some methods to the original class
class BritishTextObject
  def color
    return colour
  end
end


# Una instancia en especifico
bto = BritishTextObject.new('hello', 50.8, :blue)

class << bto
  def color
    colour
  end
end

# or

def bto.color
colour
end
```

```ruby
# inheritans
class Student < Person
  def initialize(name, course)
    super(name)
    @course = course
  end
end
```

```ruby
# SUPER

super # => Pasa todos los argumentos recibidos
super() # => No pasa ningun argumento
super(data) # => Pasa un argumento especifico

def initializer(a, b)
    super
end
```

```ruby
# Keep global state
class Document
  @default_font = :times
  
  class << self
    attr_accessor :default_font
  end
  
  attr_accessor :font
  
  def initialize(title, author)
    @title = title
    @author = author
    @font = Document.default_font
  end
end


Document.default_font
# => :times

doc1 = Document.new("Ruby Guide", "Matz")
doc1.font
# => :times

Document.default_font = :arial
Document.default_font
# => :arial

doc1.font
# => :times


```
