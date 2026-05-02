# Nested Attributes (model)

```ruby
# El modelo customer aceptara atributos nested del modelo addresses
accepts_nested_attributes_for :address, allow_destroy: true

accepts_nested_attributes_for :items, reject_if: :all_blank, allow_destroy: true

accepts_nested_attributes_for :items, allow_destroy: true, reject_if: proc { |item| item['sku'].blank? }

```


```ruby
# STRONG PARAMS
# *** IMPORTANTE: cuando mandes los parametros anidados si o si deben ir con id
def task_executor_params
  params.require(:shipment).permit(
    :warehouse_id,
    :shipping_method_config_id,
    services: {},
    customer_attributes: [
      :id,
      :name,
      :email,
      :phone,
      :_destroy,
      address_attributes: %i[id address1 address2 address3 city state zip country _destroy]
    ],
    boxes_attributes: [
      :id,
      :length,
      :width,
      :height,
      :weight,
      :clientPackageCode,
      :settings,
      :_destroy,
      items_attributes: %i[id sku quantity price currency description _destroy],
      package_attributes: %i[name length width height weight weight_uom _destroy]
    ]
  )
end
```

```ruby
# MARK FOR DESTRUCTION
{
  "shipment": {
    "boxes_attributes": [
      {
        "id": 1,
        "_destroy": true
      }
    ]
  }
}
```
