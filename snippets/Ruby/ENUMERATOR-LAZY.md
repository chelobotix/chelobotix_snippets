# ENUMERATOR LAZY

```ruby
# BUG - ESTO PUEDE LLAMAR MILLONES DE REGISTROS

users = User.active
  .map { |u| u.attributes.slice('id', 'email', 'name') }
  .select { |u| u['email'].include?('@company.com') }
  .map { |u| format_for_export(u) }

```

```ruby
# LAZY ENUMERATOR PROCESA LA CADENA ELEMENTO POR ELEMENTO

users = User.active.lazy
  .map { |u| u.attributes.slice('id', 'email', 'name') }
  .select { |u| u['email'].include?('@company.com') }
  .map { |u| format_for_export(u) }
  .force # force evalúa todo y devuelve el array final
```
