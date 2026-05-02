# Optimistic / Pessimistic Locking / Race Condition/Pesimista

```ruby
# OPTIMISTIC

# Agrega una columna lock_version al modelo
# t.integer :lock_version, default: 0, null: false

p1 = Person.find(1)
p2 = Person.find(1)

p1.first_name = "Michael"
p1.save

p2.first_name = "should fail"
p2.save # Raises an ActiveRecord::StaleObjectError
  
rescue ActiveRecord::StaleObjectError
  puts 'acceso doble detectado'


#
```

```ruby
# PESSIMISTIC
# bloquea completamente la fila hasta que acabe el proceso

account = Account.lock.find(1) # SELECT ... FOR UPDATE
account.balance -= 100
account.save!


# block
account.with_lock do
  # This block is called within a transaction,
  # account is already locked.
  account.balance -= 100
  account.save!
end


# FOR UPDATE NOWAIT
RateLimitToRequest.lock('FOR UPDATE NOWAIT').find_by(user: current_user)
```
