# HAML

```ruby
# convert from erb to haml
rails g haml:application_layout convert


# class conditional
.row.mb-2#warehouse-option{ class: ("d-none" if type == 'admin') }


# variable en la vista
- @warehouse = Warehouse.current_managed_warehouse
=@warehouse
```
