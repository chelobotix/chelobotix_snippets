# Tap Ruby on Rails

```ruby
# BASIC
user = User.new.tap do |u|
  u.name = "Marcelo"
  u.email = "marcelo@test.com"
end


# better than...
user = User.new
user.name = "Marcelo"
user.email = "marcelo@test.com"
user

```


```ruby
# WITH METHODS

order = Order.new(order_params).tap do |o| 
  o.total = calculate_totals  
  o.references = o.assign_reference
end

```

```ruby
# CHAINING SIDE EFFECTS
user = User.find(1) 
  .tap { |u| Rails.logger.info("User email: #{u.email}") } 
  .tap { |u| country = u.get_country }

```
