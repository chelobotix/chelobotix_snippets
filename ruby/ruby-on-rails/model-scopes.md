# Model - Scopes

```ruby
# SCOPE
# devuelve todos los registros mas antiguos que 50 anos (seria algo como year_published < 1974) 
scope :old, -> { where(year_published: ...50.years.ago.year) }


#
```



```ruby
# model
scope :best_raiting, -> { where(raiting: 10) }
# controller
@books_top = Review.best_raiting


#
```



```ruby
# pasando argumentos
scope :costs_more_than, ->(amount) { where('price > ?', amount) }

scope :by_account_and_warehouse,
        lambda { |current_user, warehouse_id|
          joins(:warehouse)
            .where(account_id: current_user.account_id)
            .where(warehouse_id: warehouse_id)
        }

#
```

```ruby
# INCLUDE LAMBDA BLOCK
scope :with_warehouse, ->(warehouse_id) do
    includes(:shipping_method_configs)
      .where(shipping_method_configs: { warehouse_id: warehouse_id })
      .distinct
end

# Aveces no funciona bien y es mejor con JOIN para DATATABLE
scope :by_account, -> { includes(:warehouse).where(account_id: User.current.account_id) } # Esto no da
scope :by_account, -> { joins(:warehouse).where(account_id: User.current.account_id) } # Esto si




#
```

```ruby
# last 20 messages
scope :last_twenty_msgs, -> { order(:created_at).last(20) }
#controller -> @messages = Message.last_twenty_msgs




#
```

```ruby
# top5 books
scope :top5, -> { order(views: :desc).limit(5) }



#
```



```ruby
#deleted_at
scope :deleted, -> { where.not(deleted_at: nil) }
scope :without_deleted, -> { where(deleted_at: nil) }
scope :with_deleted, -> { all }
default_scope { without_deleted }




#
```



```ruby
# DEFAULT_SCOPE ( es un scope que se utilizara absolutmante en todos los request)
default_scope { order(created_at: :desc) }
default_scope { where.not(status: 'deleted') }

```
