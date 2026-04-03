# Max by

```ruby
# Basic
a = %w(albatross dog horse)
a.max_by { |x| x.length }   #=> "albatross"


# Hash

[{:box=>[5.5, 6.0, 4.0], :packs=>2, :errors=>0}, {:box=>[4.0, 4.5, 4.5], :packs=>2, :errors=>1},{:box=>[4.0, 4.5, 4.5], :packs=>3, :errors=>0}]
array.max_by { |box| box[:packs] } # => {:box=>[4.0, 4.5, 4.5], :packs=>3, :errors=>0}

```
