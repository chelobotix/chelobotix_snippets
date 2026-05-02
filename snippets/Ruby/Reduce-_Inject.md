# Reduce - Inject

```ruby
dimensions.reduce { |acc, elem| acc * elem }
#o si eres Mid
dimensions.reduce(&:*)
```
