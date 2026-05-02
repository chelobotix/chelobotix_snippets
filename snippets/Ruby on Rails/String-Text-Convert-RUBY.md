# String  Text  Convert RUBY

```ruby
'hello David!'.downcase                 #=> hello david!
'hello David!'.upcase                   #=> HELLO DAVID!
'hello David!'.capitalize               #=> Hello david!
'hello David!'.titleize                 #=> Hello David!
"hello_david!".titleize                 #=> Hello David!
'TeStInG'.swapcase                      #=> tEsTiNg
'active_record'.camelize                # => "ActiveRecord"
'active_record'.camelize(:lower)        # => "activeRecord"
"hola soy Chelo Alarcon".parameterize   # => hola-soy-chelo-alarcon
"employee_salary".humanize              # => "Employee salary"

'It is warm outside'.sub( 'warm', 'cold' ) # => It is cold outside
"change shipping method".gsub(" ", "")  # => "changeshippingmethod"
"chelo dev".gsub(/\s+/, '')     # => elimina espacios => chelodev

"9.0x2.0x1.5".split("x") # => ["9.0", "2.0", "1.5"]
"chelo@gmail.com".split('@').first # => "chelo"

"rey leon".include?("leon") # => true

sprintf('%06d', 123) => "000123"
```


```ruby
# Arbitrarily quoted strings
str = %q("Stop", she said, "I can't live without 's and "s.")
```
