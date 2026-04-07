````md
# Tipos internos de `attribute` en Rails (ActiveRecord::Type)

En Ruby on Rails, `attribute` usa internamente el sistema de tipos de `ActiveModel::Type`, lo que permite que Rails convierta automáticamente valores recibidos desde params, base de datos o asignaciones manuales.

> Comentario útil:
> `attribute` usa el mismo motor de casting que ActiveRecord aplica a columnas reales de base de datos.
> Por eso un atributo virtual definido con `attribute` se comporta casi igual que una columna real.

---

## Sintaxis general

```ruby
attribute :nombre_del_campo, :tipo, default: valor
````

> Comentario útil:
> Si el atributo no existe en la tabla, Rails igual lo mantiene en memoria durante el ciclo de vida del objeto.
> No se persiste salvo que exista una columna real.

---

## Lista de tipos internos más usados

```ruby
:string
:text
:integer
:big_integer
:float
:decimal
:boolean
:date
:datetime
:time
:binary
:json
```

> Comentario útil:
> `:text` no tiene una clase distinta de casting respecto a `:string`; la diferencia real está en cómo normalmente se representa en base de datos.

---

# Ejemplos completos

```ruby
class Product < ApplicationRecord
  attribute :title, :string
  attribute :description, :text
  attribute :stock, :integer
  attribute :large_counter, :big_integer
  attribute :rating, :float
  attribute :price, :decimal
  attribute :published, :boolean
  attribute :released_on, :date
  attribute :published_at, :datetime
  attribute :starts_at, :time
  attribute :raw_data, :binary
  attribute :settings, :json
end
```

> Comentario útil:
> Si una columna ya existe en la tabla, `attribute` redefine cómo Rails la interpreta.

---

# Qué hace cada uno

## string

```ruby
product.title = 123
product.title
# => "123"
```

Convierte a string.

> Comentario útil:
> Rails llama internamente a `to_s`.

---

## text

```ruby
product.description = 999
product.description
# => "999"
```

Internamente igual que string.

> Comentario útil:
> La diferencia real importa más en migraciones que en casting.

---

## integer

```ruby
product.stock = "15"
product.stock
# => 15
```

Convierte string numérico a entero.

> Comentario útil:
> `"15abc"` se convierte parcialmente en algunos casos, así que valida siempre entrada.

---

## big_integer

```ruby
product.large_counter = "999999999999"
product.large_counter
# => 999999999999
```

Para enteros grandes.

> Comentario útil:
> Muy útil si tu DB usa bigint.

---

## float

```ruby
product.rating = "4.8"
product.rating
# => 4.8
```

Convierte a decimal flotante.

> Comentario útil:
> Float pierde precisión; no usar para dinero.

---

## decimal

```ruby
product.price = "12.99"
product.price
# => 0.1299e2
```

Devuelve BigDecimal.

> Comentario útil:
> Siempre preferir decimal para montos financieros.

---

## boolean

```ruby
product.published = "1"
# => true

product.published = "0"
# => false

product.published = "true"
# => true

product.published = nil
# => nil
```

> Comentario útil:
> Rails considera falsos varios valores:
> `"0"`, `"false"`, `false`, `nil`.

---

## date

```ruby
product.released_on = "2026-04-07"
product.released_on
# => Tue, 07 Apr 2026
```

Convierte a Date.

> Comentario útil:
> No incluye hora.

---

## datetime

```ruby
product.published_at = "2026-04-07 15:30"
product.published_at
# => 2026-04-07 15:30:00
```

Convierte a TimeWithZone.

> Comentario útil:
> Respeta timezone configurado en Rails.

---

## time

```ruby
product.starts_at = "14:45"
product.starts_at
# => 2000-01-01 14:45:00
```

Rails agrega fecha base.

> Comentario útil:
> Nunca asumir que ese año tiene significado real.

---

## binary

```ruby
product.raw_data = "abc"
```

Para datos binarios.

> Comentario útil:
> Se usa más en blobs o archivos serializados.

---

## json

```ruby
product.settings = { dark_mode: true, lang: "es" }
product.settings
# => {"dark_mode"=>true, "lang"=>"es"}
```

Muy útil para estructuras dinámicas.

> Comentario útil:
> Las keys terminan como strings.

---

# Ejemplo con defaults

```ruby
class Order < ApplicationRecord
  attribute :status, :string, default: "pending"
  attribute :confirmed, :boolean, default: false
end
```

> Comentario útil:
> El default se aplica al instanciar, no al guardar.

---

# Default dinámico

```ruby
class ApiToken < ApplicationRecord
  attribute :token, :string, default: -> { SecureRandom.hex(8) }
end
```

> Comentario útil:
> El bloque se ejecuta por cada instancia nueva.

---

# Tipos customizados

```ruby
class MoneyType < ActiveRecord::Type::Decimal
  def cast(value)
    super(value).round(2)
  end
end
```

Uso:

```ruby
attribute :price, MoneyType.new
```

> Comentario útil:
> `cast` transforma entrada; `serialize` transforma salida hacia DB.

---

# Seguridad

Nunca confíes en que el casting reemplaza validación.

Incorrecto:

```ruby
attribute :admin, :boolean
```

Eso no impide que llegue:

```ruby
admin: true
```

Siempre combinar con strong params y validaciones.

> Comentario útil:
> `attribute` solo transforma tipos, no protege reglas de negocio.

---

# Regla práctica

* `attribute` sirve para tipar mejor
* `attr_accessor` sirve solo para getter/setter simple
* si quieres casting Rails, usa `attribute`

> Regla mental rápida:
>
> `attr_accessor` = Ruby puro
> `attribute` = ActiveRecord inteligente

```
```
