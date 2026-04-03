# META PROGRAMMING RUBY

## Fragment 1: Eval

```ruby
# CLASS_EVAL - DEFINE_METHOD

# Define Metodos Dinamicamente
class Report
end

[:pdf, :csv, :json].each do |format|
  Report.class_eval do
    define_method("export_to_#{format}") do
      puts "Exporting to #{format}"
    end
  end
end

r = Report.new
r.export_to_pdf
r.export_to_csv


# With arguments
class MyClass
  define_method :my_method do |my_arg|
    my_arg * 3
  end
end


.
```


```ruby
# INSTANCE_EVAL

# Se usa para DSL(Domain Specific Language)
#Piensa en instance_eval como: “Ejecuta este bloque como si estuviera escrito dentro del objeto”.
# Ejecuta un bloque cambiando el self al objeto receptor. En este caso self se convierte en la clase Form.

value = :username

class Form
  def initialize(&block)
    @fields = []
    instance_eval(&block)
  end

  def field(name)
    @fields << name
  end

  def fields
    @fields
  end
end

form = Form.new do
  field(10) # closure
  field(:email)
  field(:password)
end

p form.fields  # => [10, :email, :password]


.
```

## Fragment 2: Hooks

```ruby
# SELF.INHERITED - AUTOMATIC CLASS HOOK - Se ejecuta cada vez que se crea una sub clase.
class BaseService
  @services = []

  def self.inherited(subclass)
    @services << subclass
  end

  def self.services
    @services
  end
end


class Testo1 < BaseService
end

BaseService.services # => [Testo1]


.
```


```ruby
# SELF.INCLUDED - AUTOMATIC MODULE HOOK - Se ejecuta cada vez que un modulo en añadido a una clase.
module Auditable
  def self.included(klass)
    puts "#{klass} ahora es auditable"
  end
end

class Order
  include Auditable
end

# Order ahora es auditable



.
```

## Fragment 3: Method_Missing

```ruby
# METHOD_MISSING

def method_missing(method_name, *args)
  puts("Warning, warning, unknown method called: #{method_name}")
  puts("Arguments: #{args.join(' ')}")
  super # llama a Object.method_missing
end


```


```ruby
# Se puede usar como Middleware o Proxy para delegar a otra clase
class AccountProtectionProxy
  def initialize(real_object, owner_name)
    @real_object = real_object
    @owner_name = owner_name
  end
  
  def method_missing(method_name, *args)
    super if !@real_object.respond_to?(method_name) # Te asegures que el metodo exista en el objeto real
    check_access # Aca usas logica antes de derivar al original
    @real_object.send( method_name, *args )
  end
  
  def respond_to_missing?
    @real_object.respond_to?(method_name)
  end
  
  def check_access
    raise "Illegal access: #{@owner_name} cannot access account." if @owner_name != 'natish'
  end
end


account_protection = AccountProtectionProxy.new(RealObject, 'natish')
account_protection.call


.
```

```ruby
# CONST_MISSING

def self.const_missing(const_name)
  puts "Constante faltante: #{const_name}"
end


# Se puede usar para Warnings de DEPRECATED - DEPRECATIONS
module Tasks
  class Task1New; end
  class Task2New; end

  def self.const_missing(const_name)
    case const_name
    when :Task1
      Rails.logger.warn("Task1 is deprecated, use Task1New")
      Task1New
    when :Task2
      Rails.logger.warn("Task2 is deprecated, use Task2New")
      Task2New
    else
      super
    end
  end
end




.
```



```ruby
# BLACK SLATE
# Un Blank Slate en Ruby es un objeto que tiene la menor cantidad posible de métodos heredados, para que puedas interceptar casi cualquier llamada dinámica sin interferencias.

class BlankProxy < BasicObject
  def method_missing(name, *args)
    # logic
  end
end

```

## Fragment 4: MONKEY PATCHING

```ruby
# USAR ALIAS PARA MANTENER EL METODO ORIGINAL

class User
  def full_name
    "#{first} #{last}"
  end
end

# monkey patch
class User
  alias_method :full_name_without_logging, :full_name

  def full_name
    Rails.logger.info("Calling full_name")
    full_name_without_logging.upcase
  end
end



.
```

```ruby
# SELF-MODIFYING CLASSES ACCORDING TO ENVIROMENT
class MyClass
  # Dinamic definition
  def self.enable_messages
    if Rails.env.production
      define_method(:send_message) do
        message_service.call
      end
    else
      define_method(:send_message) do
        # noop
      end
    end
  end
  
  # Initial definition
  define_method(:send_message) do
    # noop
  end
end

MyClass.enable_messages


.
```

```ruby
# Refinements

# Hace que un monkey patching solo funcione en un contexto lexico donde es convocado.

module StringExtensions
  refine String do
    def reverse
    "esrever"
    end
  end
end

module StringStuff
  using StringExtensions
  "my_string".reverse # => "esrever"
end

"my_string".reverse # => "gnirts_ym"

.
```
