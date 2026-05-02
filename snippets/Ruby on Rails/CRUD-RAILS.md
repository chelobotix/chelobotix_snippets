# CRUD RAILS

```ruby
# Delete without turbo

= link_to 'Delete', article_path(article), data: { turbo_method: :delete, turbo_confirm: 'Are you sure?' }
# or with turbo
= button_to 'Delete', quote_path(quote), method: :delete, class: 'btn btn--light' %>

# POST
<%= link_to("Join", chatroom_chatroom_users_path(chatroom), data: { turbo_method: :post }) %>

#
```

```ruby
# FIRST OR CREATE (si no encuentra un registro va a crear un nuevo like con user_id = current_user.id)

# en este caso las dos tablas que se vinculan son posts y likes
@post.likes.where(user_id: current_user.id).first_or_create!
# en este caso existe una tercera tabla que es chatroom_users y las principlaes son chatrooms y users
@chatroom_user = @chatroom.chatroom_users.where(user_id: current_user.id).first_or_create



#
```

```ruby
# Rails update_attributes without save

@box.assign_attributes(box_params)
#or
@box.attributes = box_params

# only one field
@box.write_attribute(field, value)

#
```


```ruby
# UPDATE attributes

@box.update_attributes(box_params)



#
```



```ruby
# UPDATE only specific columns

@user.update_column(:column_name, 'new value')
#o
@user.update_columns(column_name: 'new value', another_column: 'another value')



#
```



```ruby
# RELOAD object

@box.reload



#
```



```ruby
# TRANSACTION (cada dia me sorprendes más)
# 05-04-2025 Por fin te entendi
# 27-03-2026 Por fin entendi exceptions
# si exception sale -> rollback
# si no sale -> commit sin rollback

# ************
# El Rescue siempre debe ir fuera del bloque de transaction
# No recuperes jamas de Standar error pq entrara ahi y no se hara rollback
# Si tienes Transactions anidados y quieres hacer un rollback en el Nested tambien debes llamar rollback en el Parent (ver ejemplo)
# ************


# Cualquier excepcion que se genere que herede de StandardError dentro del bloque generara el rollback. Ej: ActiveRecord::RecordInvalid
# WAY 1
posts_data = [
  { title: 'Post 1', content: 'Content for post 1' },
  { title: 'Post 2', content: 'Content for post 2' },
  { title: 'Post 3', content: 'Content for post 3' }
]


# Blueprint

ActiveRecord::Base.transaction do

end

rescue ActiveRecord::RecordInvalid => e
  puts ""
rescue ActiveRecord::RecordNotFound => e
  puts ""
rescue ActiveRecord::StatementInvalid => e
  puts ""
  
  
  
# WAY 2 WITH BEGIN AND RESCUE (Esta es mejor)
begin
  ActiveRecord::Base.transaction do
    raise(StandardError, "Failed to save shipment: #{shipment.errors.full_messages}") unless shipment.save

    box.shipment_id = shipment.id
    raise(StandardError, "Failed to save box #{box.errors.full_messages}") unless box.save
    raise(StandardError, 'Failed to associate shipment with box') unless shipment.boxes << box
  end
rescue StandardError => e
  return render(json: { error: e }, status: :bad_request)
end

# WAY 3 VARIABLE DE ESTADO
transaction_successful = true

ActiveRecord::Base.transaction do
  unless @record1.save
    transaction_successful = false
  end
  
  unless @record2.save
    transaction_successful = false
  end

  raise ActiveRecord::Rollback unless transaction_successful
end

unless transaction_successful
  "tu_logica"
end
#


# ANIDADO
target_movie = nil
ActiveRecord::Base.transaction do
  Movie.create!(name: 'Star Wars', year: 1977)

  ActiveRecord::Base.transaction do
    target_movie = Movie.create!(name: 'LORD', year: 1980)
    raise(ActiveRecord::Rollback)
  end

  Movie.create!(name: 'LORD2', year: 1981)
  raise(ActiveRecord::Rollback) if target_movie.is_a?(Movie)
end

# Aca manajas tus rescue afuera:
rescue...


# FORZANDO NUEVA TRANSACTION ANIDADA SI N AFECTAR LA DE AFUERA
ActiveRecord::Base.transaction do
  User.create!(...)

  ActiveRecord::Base.transaction(requires_new: true) do
    Order.create!(...)
    raise ActiveRecord::Rollback
  end

  # El rollback anterior NO revierte User
end
```



```ruby
# DUPLICAR OBJETO

@item1.dup

# Duplicar un objeto con sus relaciones
# Duplicar el objeto shipment
shipment_clone = shipment.dup

# Duplicar cada box asociado y agregarlo al clon
shipment.boxes.each do |box|
  shipment_clone.boxes << box.dup
end


# dup: Crea una copia superficial y limpia algunos atributos (como el ID)
# clone: Similar a dup pero mantiene el estado "frozen" si existe
# deep_dup: Crea una copia profunda de los atributos y relaciones
# Marshal.load(Marshal.dump()): Crea una copia completamente nueva pero puede tener problemas con ciertos tipos de objetos



#
```

```ruby
# NEW RECORD?
shipment.order.importer.new_record?
```


```ruby
# PERSISTED

#(Devuelve true si el objeto ya esta guardado en la base de datos)
box.persisted?



#
```

```ruby
# SKIP VALIDATIONS

user.save(validate: false)



#
```



```ruby
# CHANGED Compara si hubo cambios en el modelo antes de guardar en la BD

# No funciona con nested attributes, si quieres nested debes usarlo directo en el modelo shipment.order.changed?
box.assign_attributes(params)
box.changed? # => true 
box.changes # => {"length"=>[80, 90]}
end
# aca esta la guia brutal en la seccion dirty 
https://guides.rubyonrails.org/active_model_basics.html
### change sin el signo de interrogacion si quieres ver que atributo ha cambiado
### changed_attributes para ver el valor original del cambio
### changes para ver el valor original y el actual de todos os cambios

### email_changed? puedes poner el attributo y encadenarlo con changed? para ver si ha cambiado
### email_was muestra el valor antes del cambio
### email_change muestra un array con el valor antes del cambio



#
```

```ruby
# ASIGNAR UN METODO - RELACION DE MANERA TEMPORARIA (define_singleton_method)
shipment.define_singleton_method(:boxes) { box }
# En este caso se esta asignanndo un box al modelo shipment de manera temporaria. Esto lo use en la serializacion del History en la vista Shipper 10-2024
```


```ruby
# COMO STRING O CADENA
string = "Box"
string.constantize.find(1)
# o
string = "Box"
Object.const_get(string).find(1)
# este es mas seguro
string = "Box"
klass = string.safe_constantize
klass&.find(1)
```


```ruby
#  REPLACE ActiveRecord::Associations::CollectionProxy model
@shipment.boxes[index].attributes = old_model.attributes
```


```ruby
# NEXT ID
Shipment.connection.execute("SELECT nextval('#{Shipment.sequence_name}')")[0]['nextval']
```


```ruby
# FIND OR CREATE BY

# Bloque
AccountProviderCountry.find_or_create_by!(
      account_provider: account_provider,
      currency: currency,
      country: country
    ) do |record|
      record.active = true
      record.arrive_message = '5 min a 1 hora'
      record.commission_type = 0
      record.commission = 0
    end

# Sencillo
    CountriesCurrency.find_or_create_by!(
      country: country,
      currency: currency,
      is_available: true
    )
```

```ruby
class ArticlesController < ApplicationController
  before_action :set_article, only: %i[show edit update destroy]
  before_action :require_user, except: %i[index show]
  before_action :require_same_user, only: %i[edit update destroy]
  # index
  def index
    @articles = Article.paginate(page: params[:page], per_page: 5)
  end

  # show
  def show; end

  # new
  def new
    @article = Article.new
  end

  # edit
  def edit; end

  # create
  def create
    @article = Article.new(article_params)
    @article.user = current_user
    if @article.save
      flash[:notice] = 'Article has been created'
      redirect_to(@article)
    else
      render(:new, status: :unprocessable_entity)
    end
  end

  # update
  def update
    if @article.update(article_params)
      flash[:notice] = 'Article has been updated'
      redirect_to(@article)
    else
      render(:edit, status: :unprocessable_entity)
    end
  end

  # destroy
  def destroy
    @article.destroy!
    flash[:notice] = 'Article has been deleted'
    redirect_to(articles_path)
  end

  private

  # get Article
  def set_article
    @article = Article.find(params[:id])
  end

  # article params
  def article_params
    params.require(:article).permit(:title, :description, category_ids: [])
  end

  # require_same_user
  def require_same_user
    if current_user != @article.user && !current_user.admin?
      flash[:alert] = 'You can only edit your own article'
      redirect_to(@article)
    end
  end
end

```

```ruby
module RulesBase
  extend ActiveSupport::Concern

  included do
    skip_before_action :authenticate_user!
    skip_before_action :verify_authenticity_token
    before_action :set_default_response_format
    rescue_from ActionController::ParameterMissing, ArgumentError, with: :handle_params_exception
  end

  protected

  def handle_params_exception(exception)
    render(json: {
             error: {
               title: 'Missing params',
               detail: exception.message
             },
             xenvio_api: {
               year: '2024'
             },
             status: :bad_request
           })
  end

  def handle_error(errors, status)
    error_array = []
    errors.details.keys.each_with_index do |key, index|
      error_array << {
        title: "Invalid #{key}",
        detail: errors.full_messages[index]
      }
    end

    render(json: {
             error: error_array,
             xenvio_api: {
               year: '2024'
             },
             status: status
           })
  end

  def meta_xenvio
    { xenvio_api:
        {
          year: '2024'
        } }
  end

  def set_default_response_format
    request.format = :json
  end
  
  def ensure_json_request
      render(json: { error: 'Not JSON request' }, status: :not_found) unless request.format == :json
  end
  
  def validate_number
    params[:id].to_i.to_s == params[:id]
  end
end

```
