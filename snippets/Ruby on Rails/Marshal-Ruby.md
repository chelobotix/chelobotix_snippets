# Marshal Ruby

```ruby
# Se usa cuando quieres guardar un objeto con todas sus propiedades como clase.

# Carrier::ActiveRecord_Relation
carriers = Carrier.includes(%i[mail_types shipping_methods fields]).where(fields: { visible_field: true }) 

Marshal.dump(carriers) # => string

begin
  data = Marshal.load(serialized_data) # => Carrier::ActiveRecord_Relation
rescue => e
  # Manejar el error o asignar un valor predeterminado
end

```
