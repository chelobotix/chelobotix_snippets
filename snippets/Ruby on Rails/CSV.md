# CSV

```ruby
# Csv file
marce@gmail.com,42,Bolivia
tonny@gmail.com,42,Bolivia


require('csv')

filename = File.join(Rails.root, 'test.csv')
CSV.foreach(filename) do |row|
  puts row
end


```

> Mira este video si tienes Header en tu file
https://gorails.com/episodes/intro-to-importing-from-csv?autoplay=1
