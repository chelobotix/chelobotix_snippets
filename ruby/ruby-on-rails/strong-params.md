# Strong Params

https://medium.com/codex/un-permitted-parameters-in-ruby-on-rails-why-they-dont-raise-errors-and-should-they-354a6c5ee759

```ruby
#ANTES ACORDATE QUE PUEDES ACCEDER NORMAL A PARAMS SIN PASAR POR STRONG PARAMS 

params.require(:article).permit(:title, :description, category_ids: [])

```

```ruby
#EXCEPTION
rescue_from ActionController::ParameterMissing, ArgumentError, with: :handle_empty_params
```

```ruby
#HASH NORMAL
params.to_unsafe_h
```

```ruby
# NESTED
params.require(:shipment).permit(
  :attribute1, :attribute2,
  boxes_attributes: [
    :id, :attribute1, :attribute2, :_destroy,
    items_attributes: [:id, :attribute1, :attribute2, :_destroy]
  ]
)
```

```ruby
# CAMBIAR DE CAMELCASE A SNAKECASE
# Rails 6+
params.deep_transform_keys! { |key| key.to_s.underscore.to_sym }
#or esto no funciona con los anidados asi que tienes que acceder uno por uno
params[:shipment][:order_attributes].transform_keys(&:underscore)


```

```ruby
# REMPLAZAR LOS PARAMETROS (Por ejemplo para correr un metodo de sanitizacion)
params = ActionController::Parameters.new({
  name: "John",
  age: 30
})

params.replace({ name: "Jane", profession: "Developer" })
```
