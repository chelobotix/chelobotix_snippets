# Active Model Serializers

gem('active_model_serializers', '~> 0.10.0')
documentacion de include: https://github.com/rails-api/active_model_serializers/blob/0-10-stable/docs/general/adapters.md#include-option
documentacion de fields: https://github.com/rails-api/active_model_serializers/blob/0-10-stable/docs/general/fields.md

```ruby
# Generate
rails g serializer post # singular como el modelo


#
```
```ruby
# Controller
def index
  @posts = Post.all
  render(json: @posts,
  custom_field: 'test',
  fields: [
        :updated_at, #este es el campo que mostrara de post
        author: %i[id name] #este es el campo que msotrara de la relacion author
      ], #solo mostrara este field. El field debe estar en los attributes del serializer
  include: %w[author comments comments.author], #SIEMPRE STRING! renderizara estas relaciones y su relacion nested
  key_transform: :camel_lower,
  meta: { total: 10 },
  adapter: :json_api,
  blog: true, #esto es una variable convencional que estoy pasando.
  status: 201)
end





#
```

```ruby
# Serializer
class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :custom_field, :title_size
  attribute :title, key: :full_title # cambia el nombre
  attributes(*Shipment.attribute_names.map(&:to_sym)) # All attributes ;)

  def custom_field
    @instance_options[:custom_field]
  end

  def title_size
    object.title.size
  end
  
  def show_blog?
    instance_options[:blog]
  end
  
  has_one :blog, if: :show_blog?
  belongs_to :user
end





#
```

```ruby
# ADAPTERS (initializer)
ActiveModelSerializers.config.adapter = :json_api
#or
ActiveModelSerializers.config.adapter = :json

# si es para un custom serializer:
serialized_data = ActiveModelSerializers::SerializableResource.new(
          shipment.order,
          serializer: V3Serializer,
          adapter: :attributes,
        ).as_json



#
```

```ruby
# PARSEAR una columna JSON de la DB
def services
    object.services.is_a?(String) ? JSON.parse(object.services) : object.services
end
```



```ruby
# RENDER Multiple serializer with no relation
def index
    users = User.all
    products = Product.all

    render json: {
      users: ActiveModelSerializers::SerializableResource.new(users, each_serializer: UserSerializer),
      products: ActiveModelSerializers::SerializableResource.new(products, each_serializer: ProductSerializer)
    }
  end



#
```

```ruby
# NO RENDER SAVE IN VARIABLE
serialized_shipment = ActiveModelSerializers::SerializableResource.new(
  shipment,
  include: %w[
    order.warehouse
    order.merchant.address
    shipping_method_config.shipping_method.carrier
    shipping_method_config.carrier_account
    customer.address
    boxes.items
    boxes.package
  ],
  key_transform: :camel_lower,
  meta: { total: shipment.size },
  adapter: :json
).as_json
```

```ruby
# CUSTOM SERIALIZER
ActiveModelSerializers::SerializableResource.new(
  @shipment.order,
  serializer: V3Serializer,
  adapter: :json,
  key_transform: :camel_lower
).as_json
```


```ruby
# SERIALIZAR UNA RELACION CON CONDICION
def comments
    object.comments.where(approved: true)
  end

  belongs_to :user
  has_many :comments
```

```ruby
# MANDAR DATA DENTRO DE UN SERIALIZER A OTRO (2 horas estuve)
has_many :packages, through: :package_inventories do
  object.packages.map do |package|
    PackageSerializer.new(package, warehouse_id: object.id).as_json
  end
end
```

