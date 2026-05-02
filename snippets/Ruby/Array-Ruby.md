# Array Ruby

```ruby
def <<(task)
  @sub_tasks << task
end

my_object << task
```

```ruby
def [](index)
  @sub_tasks[index]
end

puts(my_object[3])
```

```ruby
def []=(index, new_value)
  @sub_tasks[index] = new_value
end

my_object[3] = 'new item'
```
