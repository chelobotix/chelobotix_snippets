# Symbol to Proc

```ruby
["address", "city", "state", "postal", "country"]
w = w.map {|word| word.upcase}
# same
w = w.map(&:upcase)



# Other...
cost = 0
box.items.each { |item| cost += item.price }
# same
cost += box.items.sum(&:price)


```
