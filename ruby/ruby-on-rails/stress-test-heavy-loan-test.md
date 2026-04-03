# Stress test heavy loan test

```ruby
require('rails_helper')
require('benchmark') #module included in Rails

def generate_array(items, boxes)
  @box_array = []
  @items_array = []
  boxes.times do
    @box_array << { dimensions: [rand(2..100), rand(2..100), rand(2..100)], weight_limit: rand(10..100) }
  end

  items.times do
    @items_array << { dimensions: [rand(1..5), rand(1..5), rand(1..5)], weight: rand(1..47) }
  end
end

RSpec.describe('Stress Test for Easy Box Packer gem') do
  it 'items = 1K -> box = 1 ' do
    generate_array(1000, 1)
    elapsed_time =
      Benchmark.realtime do
        1.times do
          result = EasyBoxPacker.pack(
            container: @box_array[0],
            items: @items_array
          )
          puts Rainbow("test 1K items with box size = #{@box_array[0]} ============").black.bg(:cyan)
          puts Rainbow("============ #{result} ============").black.bg(:yellow)
          puts Rainbow("============Total boxes: #{result[:packings].size} ============").black.bg(:white)
        end
      end

    puts Rainbow("Elapsed time: #{elapsed_time} seconds").black.bg(:white)

    expect(elapsed_time).to(be < 1)
  end
end
```
