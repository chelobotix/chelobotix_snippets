# act as paranoid - soft delete

```ruby
# Modelo
class User < ApplicationRecord
  acts_as_paranoid
end

# Consultas comunes
# 1. Verificar si un registro específico está eliminado
user = User.with_deleted.find(1)
user.deleted?  # => true/false

# 2. Encontrar solo registros eliminados
User.only_deleted

# 3. Encontrar todos los registros (incluidos los eliminados)
User.with_deleted

# 4. Verificar si existe incluyendo eliminados
User.with_deleted.exists?(email: 'ejemplo@email.com')

# 5. Restaurar un registro eliminado
user.restore
user.restore
user.restore! # depnde de la version de la gema

# 6. Encontrar un registro específico incluso si está eliminado
User.with_deleted.find_by(email: 'ejemplo@email.com')

# 7. Encontrar las relaciones tambien con soft delete
app.warehouse_apps.only_deleted.find_each do |warehouse_app|
  warehouse_app.restore!
end
```
