# Mock Model

```ruby
# 1. Primero te creas tu clase y heredas asi:
class MyTestModel
  include ActiveModel::Model

  attr_accessor :id, :name, :age

  def persisted?
    true
  end

  def to_key
    [id] # este es el identificador unico
  end
end
```

```ruby
# 2. Luego ya puedes usarla asi:
t = MyTestModel.new(id: 1, name: "Natasha", age: 6)

Rails.application.routes.draw do
  resources :mi_test_model
end

app.my_test_model_path(123) # => "/my_test_model/123"
```
