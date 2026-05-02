# Act as Taggable

```ruby
# Todos los tags por modelo con una condicional
tags = ActsAsTaggableOn::Tag.joins(:taggings).where(taggings: { taggable_type: 'Shipment' }).where(taggings: { taggable_id: Shipment.where(account_id: 6).select(:id) }).distinct.pluck(:name)
```
