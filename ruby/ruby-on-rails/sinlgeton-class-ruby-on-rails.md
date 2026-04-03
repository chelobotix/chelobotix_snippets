# SINLGETON CLASS Ruby on rails

```ruby
# Also known as metaclass or eigenclass
# Singleton esta antes que la instancia "the singleton class has the first say"
dog1 = Dog.new
dog2 = Dog.new

dog1.bark # => "woof"
dog2.bark # => "woof"

def dog1.bark
  "WOOF!!!"
end

dog1.bark # => "WOOF!!!"
dog2.bark # => "woof"
```
