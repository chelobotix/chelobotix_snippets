# Hash Ruby

```ruby
hash = { a: 1, b: 2, c: 3 }

# NEW (Se usa cuando se quiere poner un valor por defecto cuando la clave no exista)
h = Hash.new(0)  # Valor por defecto: 0
puts h[:key]     # => 0

# dinamicamente
h = Hash.new { |hash, key| hash[key] = a + b }
# o
h = Hash.new
h.default_proc = ->(hash, key) { hash[key] = a + b }
```

```ruby
# EACH
hash.each do |key, value|
  puts "#{key}: #{value}"
end
```

```ruby
# EACH_KEY
hash.each_key { |key| puts key }
```


```ruby
# EACH_VALUE
hash.each_value { |value| puts value }
```

```ruby
# MAP
new_hash = hash.map { |k, v| [k, v * 2] }.to_h
# => { a: 2, b: 4, c: 6 }
```

```ruby
# TRANSFORM_KEY

# One level
uppercase_keys = hash.transform_keys(&:upcase)
# => { A: 1, B: 2, C: 3 }

# Multi level
hash = { person: { name: 'Rob', age: '28' } }
hash.deep_transform_keys{ |key| key.to_s.upcase }
# => { "PERSON" => { "NAME" => "Rob", "AGE" => "28" } }
```

```ruby
# TRANSFORM VALUE
doubled_values = hash.transform_values { |v| v * 2 }
# => { a: 2, b: 4, c: 6 }
```

```ruby
# SELECT - FILTER
even_values = hash.select { |k, v| v.even? }
# => { b: 2 }
```

```ruby
# REJECT
odd_values = hash.reject { |k, v| v.odd? }
# => { b: 2 }
```

```ruby
# MERGE
hash.merge({ d: 4 })
# => { a: 1, b: 2, c: 3, d: 4 }

# reverse_merge (solo copia los keys que no existen en el target)
options = { a: 1 }.reverse_merge(b: 2) # => { a: 1, b: 2 }
```

```ruby
# DEEP MERGE (RECURSIVE NESTED)
a = { foo: { bar: 1 }, baz: 2 }
b = { foo: { qux: 3 } }

a.deep_merge(b)
# => { foo: { bar: 1, qux: 3 }, baz: 2 }
```


```ruby
# DIG
nested_hash = { a: { b: { c: 3 } } }
nested_hash.dig(:a, :b, :c)
```

```ruby
# COMPACT
hash = { a: 1, b: nil, c: 3, d: nil }.compact 
# { a: 1, c: 3 }
```

```ruby
# ACCESS SYMBOLS - STRINGS - INDIFFERENT
# convierte todas las claves en symbol
hash.deep_symbolize_keys 

# convierte todas las claves en string
hash.stringify_keys

# indifferent
# Puedes acceder como simbolo o como cadena (Solo Rails)
hash.with_indifferent_access
```

```ruby
# KEY?
hash.key?(:name)
hash.has_key?(:name) 
hash.include?(:name)
hash.member?(:name)
hash[:name].nil?

# con un array
hash = { "test1" => "valor1", "test3" => "valor3" }
keys_to_check = ['test1', 'test2']
matching_keys = hash.keys & keys_to_check # => ["test1"]
```

```ruby
# DELETE
deleted_key = hash.delete(:edad)
```

```ruby
# REPLACE KEY_NAME
hash[:new_name] = hash.delete(:old_name)
```

```ruby
# CONVERT STRING TO HASH
string_to_hash = JSON.parse(@app.headers, symbolize_names: true)
#or
string_to_hash = JSON.parse(@app.headers.gsub('=>', ':'))
```

```ruby
# ACTIVE RECORD TO HASH
active_record_model.attributes
```

```ruby
# EACH_WITH_OBJECT
# Creas un nuevo Hash o Array a partir de otro

# Array
(1..9).each_with_object([]) do |item, my_array|
  my_array << item
end
# result -> [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Hash
["banana", "pineapple", "orange"].each_with_object({}) do |item, my_hash|
  my_hash[item] = item.upcase
end
# -> {"banana"=>"BANANA", "pineapple"=>"PINEAPPLE", "orange"=>"ORANGE"} 


#
```

```ruby
# TO_UNSAFE_HASH
.to_unsafe_h
```

```ruby
# COPY - CLONE
h2 = hash.dup # Shallow
h2 = hash.deep_dup # Deep



.
```

```ruby
# COMPARACION

| Método   | Qué compara      |
| -------- | ---------------- |
| `==`     | Contenido        |
| `eql?`   | Contenido + tipo |
| `equal?` | Mismo objeto     |


h1 = { zip: 123 }
h2 = { zip: 123.0 }

h1 == h2        # true
h1.eql?(h2)     # false
h1.equal?(h2)   # false


.
```


```ruby
# FETCH
options = { active: false }

options.fetch(:active, true)
```











