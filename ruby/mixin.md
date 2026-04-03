# Mixin

```ruby
# mixin each from enumarable
class Refrigerator
  include Enumerable

  def initialize(foods:, drinks:)
    @foods = foods
    @drinks = drinks
  end

  # all_items
  def all_items
    @foods + @drinks
  end

  # overwriting each
  def each(&)
    (@foods + @drinks).each(&)
  end
end

refrigerator = Refrigerator.new(foods: %w[apple meat fish], drinks: %w[coke juice guarana])
refrigerator.each { |item| puts "#{item} is delicious" }


# Custom Mixin
module Purchaseable
  def purchase(item)
    puts("#{item} has been purchased")
  end
end

class Bookstore
  include Purchaseable
end

class Supermarket
  include Purchaseable
end

class Bodega < Supermarket
end

bookstore = Bookstore.new
supermarket = Supermarket.new
bodega = Bodega.new

bookstore.purchase('Libro')
supermarket.purchase('Meat')
bodega.purchase('Vino')

```
