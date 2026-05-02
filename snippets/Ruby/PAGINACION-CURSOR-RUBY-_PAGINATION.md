# PAGINACION CURSOR RUBY - PAGINATION

```ruby
# CURSOR PAGINATION
# GET /users?after_id=5000

class User < ApplicationRecord
  scope :after, ->(cursor) {
    where("id > ?", cursor) if cursor.present?
  }
end

def index
  cursor = params[:after_id].to_i || 0
  
  users = User.after(cursor)
              .limit(20)
              .order(:id)

  next_cursor = users.last&.id
  render json: {
    data: users,
    next_cursor: next_cursor
  }
end

# Aca el front detectara el ultimo id y hara el request siguiente en base a ese.
🎯 When Should You Use Cursors?
Use cursors when:

✔ Processing millions of records
✔ Running background jobs
✔ Building scalable APIs
✔ Migrating large datasets

Regla mental rápida
Usa cursor si el usuario piensa:

“quiero seguir viendo más”

Usa offset si piensa:

“quiero ir a una posición exacta”
```
