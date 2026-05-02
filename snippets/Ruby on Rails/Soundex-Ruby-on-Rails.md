# Soundex Ruby on Rails

```ruby
# Encuentra palabras que suenan parecido → mismo código

def methods_that_sound_like( name )
  missing_soundex = Soundex.soundex( name.to_s )
  
  self.public_methods.sort.find_all do |existing|
    existing_soundex = Soundex.soundex( existing.to_s )
    missing_soundex == existing_soundex
  end
end
```
