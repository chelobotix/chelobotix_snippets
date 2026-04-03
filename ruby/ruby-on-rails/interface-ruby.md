# Interface Ruby

```ruby
# Implementas modulos con la interface
module Flyable
  def fly
    raise NotImplementedError, "You must implement the fly method"
  end
end

module Swimmable
  def swim
    raise NotImplementedError, "You must implement the swim method"
  end
end
```

```ruby
class Duck
  include Flyable
  include Swimmable

  def fly
    "I'm flying!"
  end

  def swim
    "I'm swimming!"
  end
end
```
