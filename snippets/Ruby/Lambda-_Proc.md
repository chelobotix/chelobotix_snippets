# Lambda - Proc

![PastedGraphics](file:///.attachment/C81A07B3-94AA-447B-ABDB-533A377D2710.png)

```ruby
# 🧠 ¿Cuándo usar una lambda?

# Una lambda es útil cuando quieres encapsular lógica que:

# * Captura y reutiliza variables de su contexto léxico original, y
# * Puede ser pasada y ejecutada en otro lugar donde ese contexto ya no está visible directamente.
```


```ruby
# BASIC
my_lambda = lambda {|x, y| x * y} # x,y son parametros
my_lambda.call(2,3) 
```

```ruby
# EJEMPLO BASICO DE USO EN OTRO CONTEXTO LEXICO (Mira con calma el valor de la variable "number" 18-04-2025)
# El lambda captura la variable number del lugar donde fue definido, no donde se ejecuta.
class Test1
  def testo(my_lambda)
    number = 1
    my_lambda.call
    puts "number del contexto lexico de la clase: #{number}"
  end
end


number = 10

counter = lambda do
  number += 1
end

Test1.new.testo(counter)

puts "number del contexto lexico del lambda: #{number}" # =>
```

```ruby
# TEMPLATE
wizard_warehouse_service =
  lambda do |params, current_user|
    Wizards::OnBoarding::WarehouseService.new(params, current_user)
  end
```

```ruby
# POR FIN 31-03-2025!!!
# Lambda enforces the number of arguments passed!
# Se usa para desacoplar la dependecia de un servicio que requiere un dato generado dentro del servicio padre
class TestoController < ApplicationController
  def index
    # Este Labda se ejecutara desde dentro del servicio padre Testo
    custom_lambda = ->(msg) {
      Testo2Service.new(msg).call
    }

    testo_result = TestoService.new("testo", custom_lambda).call

    puts testo_result
  end
end
```

```ruby
class TestoService
  def initialize(msg, custom_lambda)
    @msg = msg
    @custom_lambda = custom_lambda
  end

  def call
    puts "request to api"
    sleep 1
    @msg = @msg + " " + "response from api"
    @custom_lambda.call(@msg)
  end
end
```

```ruby
class Testo2Service
  def initialize(msg)
    @msg = msg
  end

  def call
    @msg + "+ testo 2"
  end
end

```

```ruby
# OPERADOR &
# Resumen conceptual

# El operador & hace dos cosas distintas según contexto:

# En parámetros (def m(&b))	Convierte bloque en Proc
def metodo(&mi_proc)
  mi_proc.call
end

metodo { puts "hola" }


# En llamada (m(&proc))	Convierte Proc en bloque
mi_proc = Proc.new { puts "Hola" }

def metodo
  yield
end

metodo(&mi_proc)


.
```


```ruby
# IF YIELD
# Imprime o ejecuta si el bloque retorna true

def event(description)
  puts "ALERT: #{description}" if yield
end

event("CPU high") do
  cpu_usage > 90
end


.
```
