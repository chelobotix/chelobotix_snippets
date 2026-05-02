# Caching with Instance Variables Memoization

```ruby
# Model
# (La primera vez se ejecutara el query pero las siguientes ya no)
def self.first_book
  @first_book ||= Book.first
end
```
