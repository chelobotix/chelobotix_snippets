# View Component

https://api.rubyonrails.org/v8.1.3/classes/ActionView/Helpers/TagHelper.html


```ruby
rails generate component Greeting name
```

# Helpers de Rails usados en ViewComponent

## `content_tag`

### Firma

```ruby
content_tag(tag_name, content = nil, options = nil, &block)
```

### Qué hace

Genera una etiqueta HTML.

### Ejemplo

```ruby
content_tag(:div, class: 'box') do
  concat("Hello")
end
```

### HTML generado

```html
<div class="box">
  Hello
</div>
```

### Ejemplo sin bloque

```ruby
content_tag(:span, "Hello", class: "red")
```

### HTML generado

```html
<span class="red">Hello</span>
```

---

## `concat`

### Firma

```ruby
concat(content)
```

### Qué hace

Agrega contenido al buffer HTML actual dentro de un bloque.

### Ejemplo

```ruby
content_tag(:div) do
  concat("A")
  concat("B")
end
```

### HTML generado

```html
<div>AB</div>
```

### Nota importante

Sin `concat`, dentro de un bloque Rails solo renderiza el último valor retornado.

---

## `label_tag`

### Firma

```ruby
label_tag(name = nil, content_or_options = nil, options = nil, &block)
```

### Qué hace

Genera una etiqueta `<label>`.

### Ejemplo

```ruby
label_tag("email", "Email")
```

### HTML generado

```html
<label for="email">Email</label>
```

### Ejemplo con bloque

```ruby
label_tag("city") do
  "City"
end
```

### HTML generado

```html
<label for="city">City</label>
```

---

## `text_field_tag`

### Firma

```ruby
text_field_tag(name, value = nil, options = {})
```

### Qué hace

Genera un `<input type="text">`.

### Ejemplo

```ruby
text_field_tag("city")
```

### HTML generado

```html
<input type="text" name="city">
```

### Ejemplo con valor

```ruby
text_field_tag("city", "Miami")
```

### HTML generado

```html
<input type="text" name="city" value="Miami">
```

---

## `select_tag`

### Firma

```ruby
select_tag(name, option_tags = nil, options = {})
```

### Qué hace

Genera un `<select>`.

### Ejemplo

```ruby
select_tag("country", options_for_select([["USA", "US"]]))
```

### HTML generado

```html
<select name="country">
  <option value="US">USA</option>
</select>
```

---

## `options_for_select`

### Firma

```ruby
options_for_select(container, selected = nil)
```

### Qué hace

Genera etiquetas `<option>` para un select.

### Ejemplo

```ruby
options_for_select([["USA", "US"], ["Canada", "CA"]])
```

### HTML generado

```html
<option value="US">USA</option>
<option value="CA">Canada</option>
```

### Ejemplo con selected

```ruby
options_for_select([["USA", "US"]], "US")
```

### HTML generado

```html
<option value="US" selected="selected">USA</option>
```

---

## `fields_for`

### Firma

```ruby
fields_for(record_name, record_object = nil, options = {}, &block)
```

### Qué hace

Genera campos anidados para estructuras complejas.

### Ejemplo

```ruby
form.fields_for('locations[]', OpenStruct.new, index: 0) do |f|
  f.text_field(:city)
end
```

### HTML generado

```html
<input type="text" name="locations[0][city]">
```

### Uso típico

Sirve para:

* nested params
* múltiples objetos
* arrays dinámicos

---

## `form.text_field`

### Firma

```ruby
form.text_field(method, options = {})
```

### Qué hace

Genera input ligado al form builder.

### Ejemplo

```ruby
form.text_field(:name)
```

### HTML generado

```html
<input type="text" name="model[name]" id="model_name">
```

---

## `form.select`

### Firma

```ruby
form.select(method, choices = nil, options = {}, html_options = {})
```

### Qué hace

Genera select ligado al form builder.

### Ejemplo

```ruby
form.select(:country, [["USA", "US"]])
```

### HTML generado

```html
<select name="model[country]" id="model_country">
  <option value="US">USA</option>
</select>
```

---

# Diferencia importante: `_tag` vs `form builder`

## Helpers `_tag`

```ruby
text_field_tag("city")
```

### Tú controlas manualmente:

* name
* value
* id

---

## Helpers de form builder

```ruby
form.text_field(:city)
```

### Rails genera automáticamente:

* name
* id
* asociación con modelo

---

# Regla mental rápida

## `_tag`

HTML manual

## `form builder`

HTML ligado al modelo

---

# Seguridad ⚠️

## `content_tag`

Rails escapa contenido automáticamente.

### Riesgo

```ruby
content_tag(:div, user_input.html_safe)
```

Puede abrir XSS.

---

## `concat`

Si concatenas contenido externo sin sanitizar:

```ruby
concat(user_input)
```

puede ser riesgoso si usas `html_safe`.

---

## `fields_for`

Si el index está mal definido:

```ruby
locations[][city]
```

params pueden llegar corruptos.

---

# Nota práctica para ViewComponent

En componentes complejos:

```ruby
content_tag + concat
```

es el patrón estándar porque permite construir árboles HTML limpios sin ERB.


