# Can Can Can

```ruby
Example Rule in Explicit Form
Instead of implicit logic scattered across the app:

“Project updates are allowed for administrators or responsible users.”

Express it as:

Target: Project
Operation: update
Allowed when:
  role == admin
  OR condition == assigned_user
Now anyone can understand the rule without reverse-engineering roles.
```


```ruby
# BASIC
# in controller (esto genera automaticamente el ,metodo set_post y igual el @post = Post.new para la accion new)
 load_and_authorize_resource
 
#ability
 def initialize(user)
    user ||= User.new
 
    can :manage, :all, user_id: user.id if user.role == 'user'
    can :read, Recipe, public: true
end

```


```ruby
# SOLO UNA ACCION DEL CONTROLADOR
can :nombre_de_la_accion, ModelName
can [:accion1, :accion2], ModelName

# con condicion
can :nombre_de_la_accion, ModelName, user_id: user.id

```

```ruby
#CONTROLER NO MODEL
# Ability
can(:manage, :setting) # el nombre del controlador es en singular esto es para habilitar todas las acciones
# o varias acciones
can(%i[index list], :setting)

#controller SettingsController.rb
authorize_resource class: false

```


```ruby
#MULTIPLE CONDITIONS
can(:manage, CustomApp, account_id: user.account_id)
can(:manage, CustomApp, warehouse_id: Warehouse.with_role(:warehouse_manager, user).pluck(:id).first)


#Nested ID
can :create, Box do |box|
    user.warehouse == box.shipment.warehouse
end
```


```ruby
#DIFERENTES ACCIONES
can(%i[create], Box)
can %i[read update destroy], Box do |box|
  Warehouse.current_user_warehouse.id == box.shipment.warehouse.id
end

```



```ruby
# VERIFY ABILITY (rails console)
# Ability
can :manage, Warehouse, account_id: user.account_id
can :search_by_carrier_account_ajax, Warehouse

# Console
user = User.find(6)
ability = Ability.new(user)
warehouse = Warehouse.last

ability.can?(:manage, warehouse) # Esto es para modelos warehouse que tengan account_id pq comparara con user.account_id 
ability.can?(:search_by_carrier_account_ajax, warehouse) # Esto habilita una accion default

```

```ruby
# FILTRAR INDEX CON CAN CAN
def index
  # CanCanCan automáticamente filtra los registros según las reglas definidas.
  @mail_types = MailType.accessible_by(current_ability)
end
  
```

```ruby
# SKIP EN UNA ACCION
load_and_authorize_resource except: :create

skip_before_action :verify_authenticity_token, only: %i[create]

def create
  if request.format == 'text/javascript'
    @record = Model.new
    verify_authenticity_token
    authorize!(:create, @record)
  end
end
```

> gem 'cancancan'
rails generate cancan:ability
https://rubystacknews.com/2026/02/17/stop-checking-admin-designing-authorization-that-wont-become-technical-debt-kaigi-on-rails-2025/
