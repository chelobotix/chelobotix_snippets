# Files

```ruby
# READ
file_path = Rails.root.join('app/schemas/package_optimization_schema.json').to_s
file = File.read(file_path)

# o directo
file = Rails.root.join('spec/json/valid.json').read
```



