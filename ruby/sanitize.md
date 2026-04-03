# Sanitize

```ruby
# Sanitizar un bio donde no se acepta scripts ni style pero si links
<%= sanitize @user.bio %> 
```

```ruby
# Sanitizar links donde el usuario ingrese una url, pero se quiere evitar que ingrese un script malicioso
<%= sanitize link_to 'google, https://google.com' %> 
```

```ruby
# SANITIZAR LIKE
ActiveRecord::Base.sanitize_sql_like("Natish % Reinish") # => "hola&amp;"
```

```ruby
# SANITIZAR HTML
ERB::Util.html_escape("hola&") # => "hola&amp;"
```
