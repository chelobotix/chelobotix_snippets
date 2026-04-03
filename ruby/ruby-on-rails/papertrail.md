# PaperTrail

1. gem 'paper_trail'
2. rails generate paper_trail:install
3. rails db:migrate 

```ruby
# Quien origino el cambio
shipment.paper_trail.originator    # => 6
```

```ruby
# Previous Version
shipment.paper_trail.previous_version
```

```ruby
# Diferencias afectadas en el cambio
shipment.versions.last.changeset
```

```ruby
# Ver si es la version actual en la BD
shipment.paper_trail.live?
```

```ruby
# Version anterior 
shipment.version.reify
shipment.paper_trail.previous_version
```

```ruby
#  Sobreescribir agun dato de la tabla versions
class Address < ActiveRecord::Base
  has_paper_trail

  # Sobrescribimos el callback para personalizar el `item_type`
  def paper_trail_update(new_attributes, options = {})
    paper_trail.save_with_version(item_type: 'address_customer', **new_attributes)
  end
end
```

```ruby
# Que vas a trackear (aca solo update)
has_paper_trail on: [:update]
```

```ruby
# Limitar la cantidad de versiones apra un modelo
PaperTrail.config.version_limit = 3
```

```ruby
# Consultar la tabla versions
PaperTrail::Version.find(123)
```


```ruby
# Restaurar a partir de Version
version = PaperTrail::Version.find(123)
box = version.reify
box.save!
```


```sql
// Bug versions cuando es mas bajo
SELECT MAX(id) FROM versions;

SELECT last_value FROM versions_id_seq;


SELECT setval('versions_id_seq', (SELECT MAX(id) FROM versions));

```



