# Simple Form

```ruby
# CUSTOM STYLE CLASS
wrapper_html: { class: 'mb-1' }
```

```ruby
# Basic with model
= simple_form_for @user, html: { remote: true, class: 'my_class' } do |f|
# :scope independiente de cualquier modelo (se usa para buscar algo o cosas que no requieren manejar modelos)
= simple_form_for :search, url: search_path, method: :get do |f|
```

```ruby
# select de un RELATION[]
.row.mb-2
			.col-sm-12
				= f.input :warehouse_id,
					collection: Warehouse.where(account_id: current_user.id),
					label_method: :name, # -> (warehouse) { "#{warehouse.name} - #{warehouse.code}" }
					value_method: :id,
					{priority_countries: ['US'], include_blank: true},
					required: false,
					disabled: false,
					label: 'Destination warehouse',
					selected: type == 'admin' ? '1' : '2', # esto es el indice del select
					include_blank: false,
          input_html: { class: 'select_by_warehouse' }
				
			# label personalizado con varios campos (app es lo que va a retornar desde tu collection o sea tu record)
			label_method: ->(obj) { obj.name.capitalize }
			label_method: ->(app) { "#{app.name} (#{app.warehouse.name})" },	

```

```ruby
# select personalizado
.row.mb-2
			.col-sm-12
				= f.input :warehouse_id,
							collection: [['1','Admin'], ['2','Warehouse Manager']],
							label_method: :last,
							value_method: :first,
							include_blank: false,
							required: false,
							label: 'Role'

```


```ruby
# radio de un booleano de la BD
= f.label :active, 'Active:', {class: 'mr-2'}
					= f.collection_radio_buttons :active,
					[[true, 'Yes'], [false, 'No']],
					:first, :last,
					{item_wrapper_class: 'form-check form-check-inline'},
					class: 'form-check-input'
	
```				
					

```ruby
# check box
.col-sm-12
					%label.custom-control.custom-checkbox
						= f.input_field :status,
						as: :boolean, boolean_style: :inline,
						class: 'custom-control-input',
						checked: true,
            checked_value: true
						%span.custom-control-label Status
```						
						

```ruby
# valor por defecto y clase
input_html: { value: @order_id, class: 'page-title small-input' },
= f.input :body_request, input_html: { value: 'hola!' }	
```


```ruby
# Require FALSE
= f.input :order_number, required: false
```


```ruby
# HIDDEN
= f.input :email, as: :hidden, input_html: { value: user.email }
```

```ruby
# NO HACE PARTE DEL MODELO
= f.hidden_field :order_id, value: "32"   #(metodo simple form)
= hidden_field_tag 'view_referer', 'valor_que_quieres pasar'  #(metodo de rails)
#or for collection
= label_tag "warehouse_id", "Warehouse"
= select_tag "warehouse_id", options_from_collection_for_select(Warehouse.all_account, :id, :name), include_blank: true, required: false, class: "form-control"
```

```ruby
# ARRAY en HIDDEN que haga parte del modelo
ids = ["1", "2"]
-if settings.present?
  - settings.each do |setting|
    = f.hidden_field :settings_array, value: setting, multiple: true
#(strong parameters) => :items_id_array    

# ARRAY en HIDDEN que haga parte del modelo
```


```ruby
# forzar el tipo
as: :string
```

```ruby
# wraper del input
wrapper_html: { class: 'm-0', style: 'margin-bottom: 0;' },
```


```ruby
# Submit
= f.button :submit, "Import shipment", class: 'btn btn-primary'
# with spinner
= f.button :button, "Search", data: {disable_with: raw("<i class='fa fa-refresh fa-spin fa-fw'></i>Searching...")}
```



```ruby
# NESTED association (With cocoon gem)
1. accepts_nested_attributes_for :items, allow_destroy: true    #(en el modelo Box)
   validates_associated :items
   
2. crear un partial para el formulario nested #(order es un atributo extra no es obligatorio)
    = f.simple_fields_for :items do |item|
      = render 'item_fields', f: item, order: order   


3. = f.simple_fields_for :items do |p|    #(esto va a iterar los existent es o los nuevos que se vayan anadiendo)
  = p.input :sku, label: false
	= p.input :description, label: false
	= link_to_remove_association 'Remove', p
	
	
4.%div.items  #(Aca se va a insertar)
	
	
	
5.	= link_to_add_association 'Add product',
f,
:items,
data: { 'association-insertion-node' => '.items', 'association-insertion-method' => 'after'},
render_options: {locals: {order: order}}  #(Esto va a anadir dinamicamenter los campos del nested form, el ultimo es por si quieres pasar un parametro al nested form)


6. Anadir el nested en Strong params: def box_params
    params.require(:box).permit(
      :box_id,
      :package,
      :weight,
      items_attributes: [
        :id,
        :sku,
        :description,
        :_destroy
      ])
  end
  
  
  
7. En la accion create solo necesitas crear @box = Box.new(box_params) con tus paremetros fuertes y ya anadira box.items automaticamente.





# Ver si un nested object esta marcado apra destruccion
@box.items.reject { |item| item.marked_for_destruction? }
#o
valid_items = items.reject(&:marked_for_destruction?)
```
