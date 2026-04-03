# Active Snapshot

```ruby
# CREATE
shipment.create_snapshot!(identifier: "pruebita1", user: User.find(6))
#
```

```ruby
# RESTORE
snapshot.restore!
```

```ruby
# FIND
snapshot = @shipment.snapshots.find_by(id: @shipper_history_id)
```

```ruby
# RESTORE
```

```ruby
# REVISAR PARENT Y CHILDS
reified_parent, reified_children_hash = snapshot.fetch_reified_items
```

```ruby
has_snapshot_children do
    shipment = Shipment.includes(
      :boxes,
      customer: [:address],
      order: [
        :items,
        merchant: [:address],
        billing: [:address],
        importer: [:address]
      ]
    ).find(id)

    # Define the associated records
    {
      customer: shipment.customer,
      customer_address: shipment.customer.address,
      #comment_sub_records: instance.comments.flat_map{|x| x.comment_sub_records },
      boxes: shipment.boxes, 
      order: shipment.order,
      items: shipment.order.items,
      merchant: shipment.order.merchant,
      merchant_address: shipment.order.merchant.address,
      billing: shipment.order.billing,
      billing_address: shipment.order.billing.address,
      importer: shipment.order.importer,
      importer_address: shipment.order.importer.address
    }
  end
```
