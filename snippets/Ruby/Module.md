# Module

```ruby
# INITIALIZE

module MyModule
  def initialize
    @observers = []
  end
end

class MyClass
  include MyModule
  
  def initialize
    super
    @other = 123
  end

end
```

