# Seed

```ruby
#random from model:
random_product = Product.order("RANDOM()").first
#or
Product.all.sample
```
