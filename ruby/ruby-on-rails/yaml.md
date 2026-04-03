# YAML

```ruby
# PARSE
YAML.safe_load(version.object_changes)
# Si te sale error que no acepta alguna clase
YAML.safe_load(version.object_changes, permitted_classes: [Time]).with_indifferent_access
```
