# Relations

```ruby
has_many :articles, dependent: :destroy # va en el modelo que PRESTA su clave primaria (o sea iria en el modelo user)
belongs_to :user # va en el modelo que TIENE la clave foránea (o sea iria en el modelo order)
```

```ruby
# ONE TO ONE 1 -> 1 
has_one :importer, inverse_of: :order
belongs_to :order, inverse_of: :importer
```


```ruby
# 3 TABLE necesitas crear la tabla BooksOrders
model book
    has_many :books_orders, dependent: :destroy
    has_many :orders, through: :books_orders
    
model order
    has_many :books_orders, dependent: :destroy
    has_many :books, through: :books_orders
    
# OLD WAY
# Un libro puede tener n ordenes y una orden puede tener n books (many to many)
# necesitas crear la tabla BooksOrders
model Book
    has_and_belongs_to_many :orders, join_table: 'books_orders'
    
model Order
    has_and_belongs_to_many :books, join_table: 'books_orders'
```


```ruby    
# NESTED
class Box < ApplicationRecord
  has_many :items, inverse_of: :box, dependent: :destroy
  accepts_nested_attributes_for :items, reject_if: :all_blank, allow_destroy: true

  validates_associated :items
end

class Item < ApplicationRecord
  belongs_to :box

  validates :weight, presence: true
end
```


```ruby
# CLAVE FORANEA NO OBLIGATORIA
belongs_to :post, optional: true
```


```ruby
# Ordenar Shipment por el campo shipment_number
has_many :shipments, -> { order 'shipment_number' }, dependent: :destroy
```

```ruby
# DEPENDENT
has_many :items, dependent: :nullify
has_many :items, dependent: :restrict_with_error
has_many :items, dependent: :delete_all # no ejecuta callbacks ni validaciones, es peligroso
```
