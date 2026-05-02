# Sandi Metz

```ruby
# RESUMEN
# 1. Siempre crear variables de instancia con accessors para poderlas cambiar mas facil a futuro.
# 2. Cuando tu colección de datos maneja datos con significado propio, es compleja y se accede varias veces a sus posiciones
# 3. Siemrpe crear con KEY arguments
# 4. Si no se puede inyectar la dependencia es mejor isolarla en un metodo
# 5. Crea un hash de errores con codigo
# 6. ENV.fetch('API_KEY') => para fallar temprano si no existe
# 7. Detectar Duck Types 
# 8. Detectar posible Herencia
```

```ruby
# Siempre crear variables de instancia con accessors para poderlas cambiar mas facil a futuro.

class MyClass
  private attr_reader :foo
  
  def initialize(foo)
    @foo = foo
  end
  
  def call
    private_method
  end
  
  private
  
  def private_method
    puts 'private'
  end
end



#
```




```ruby
# Cuando tu colección de datos maneja datos con significado propio, es compleja y se accede varias veces a sus posiciones.

class RevealingReferences
  # Solo lectura de la variable de instancia @wheels
  attr_reader :wheels

  def initialize(data)
    # Convertimos los datos crudos (arrays) en objetos Wheel
    @wheels = wheelify(data)
  end

  # Método que devuelve un array con los diámetros de las ruedas
  def diameters
    wheels.map do |wheel|
      wheel.rim + (wheel.tire * 2)
      # En lugar de acceder a cell[0] y cell[1],
      # ahora usamos nombres expresivos: rim y tire
    end
  end

  # Definimos una estructura ligera para representar una rueda
  Wheel = Struct.new(:rim, :tire)

  # Convierte un array de arrays crudos en objetos Wheel
  def wheelify(data)
    data.collect do |cell|
      Wheel.new(cell[0], cell[1])
    end
  end
end




#
```



```ruby
# Si no se puede inyectar la dependencia es mejor isolarla en un metodo de esta forma:

class Gear
  def initialize(chainring, cog, rim, tire)
    @chainring = chainring
    @cog = cog
    @rim = rim
    @tire = tire
  end

  def gear_inches
    (ratio * wheel.diameter).round(2)
  end

  private

  def wheel ###### <= asi
    @wheel ||= Wheel.new(@rim, @tire)
  end
end




#
```


```ruby
# DETECTAR DUCK TYPES

# 1. Si tienes CASES que seleccionan la clase o condiciones kind_of? and is_a? mejor la pasas como instancia:

class GetCarrierLabel
  attr_reader :carrier, :shipment

  def initialize(carrier:, shipment:)
    @carrier = carrier
    @shipment = shipment
  end

  def call
      instance = carrier.new(shipment)
      instance.get_label
      carrier.valid? ? true : false
  end
end

carrier = GetCarrierLabel.new(Carrier)
carrier.call



.
```


```ruby
# DETECTAR POSIBLE HERENCIA

# Si tienes variables que se llamen: "type", "category", etc. Puede ser una señal para convertir esa clase en una super clase
# La herencia soluciona  tipos muy relacionados que comparten un comportamiento común pero difieren en algo.
```

ue se llamen

