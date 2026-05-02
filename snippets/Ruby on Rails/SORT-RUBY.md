# SORT RUBY

```ruby
# BASIC
numbers.sort                    # => [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
numbers.sort.reverse            # => [9, 6, 5, 5, 4, 3, 3, 2, 1, 1]
```

```ruby
# SORT_BY
fruits = ['banana', 'apple', 'pear', 'orange']
fruits.sort_by { |fruit| fruit.length }  # => ["pear", "apple", "banana", "orange"]
fruits.sort_by(&:length) 


```
