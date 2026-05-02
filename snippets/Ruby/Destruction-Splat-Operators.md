# Destruction Splat Operators

```ruby
# Array
arr = [1, 2, 3]
x, y, z = *[1,2,3]
a, b, c = arr
# o para ignorar algunos
a, _, c, _ = arr
first, *rest, last  = ["a", "b", "c", "d"]

# Hash
data = { test1: 'ddas', test2: 'ewqe' }
test1, test2 = data.values_at(:test1, :test2)



```
