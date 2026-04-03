# Store accessors

```ruby
# en el modelo Box
# sirve para anadir en un campo de la tabla un hash con varias propiedades:
store :settings, accessors: %i[custom_label_tag1  fedex_zpl_data], coder: JSON
# el campo setting sera un hash que acepte los parametros que estan en el array
# y puedes acceder asi:
boxes.fedex_zpl_data = "bla bla"
boxes.custom_label_tag1 = "dum dum"

```

```ruby
# UPDATE ACCESSOR

# way 1
record.accessor1 = new_value

# way 2
record[:accessor1] = new_value

# way 3
record.write_attribute(accessor1 , new_value)
```
