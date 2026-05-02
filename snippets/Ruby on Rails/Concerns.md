# Concerns

```ruby
#1. Crear el archivo soft_deletable.rb en la carpeta concerns dentro de models
module SoftDeletable
  extend ActiveSupport::Concern

# Lo que se pone en included do se ejecutara en cada modelo o controlador que tenga el concerns como si estuviera escrito en el mismo.
  included do 
    scope :deleted, -> { where.not(deleted_at: nil) }
    scope :without_deleted, -> { where(deleted_at: nil) }
    scope :with_deleted, -> { all }

    default_scope { without_deleted }
  end
end

#2. Te vas al modelo que quieras que use el concern y lo incluyes
include SoftDeletable

```

```ruby
# EN UN CONTROLLER
# 1. app/controllers/concerns/nova_methods
# 2. module NovaMethods
  extend ActiveSupport::Concern

  private
  def test1
    
  end
  
end

# 3. Incluir en el controler 
include NovaMethods

```
