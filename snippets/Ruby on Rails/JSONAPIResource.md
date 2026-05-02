# JSONAPI::Resource

```ruby
# CAMBIAR DE NOMBRE A UN CAMPO
attribute :released_at, delegate: :year # cambia elnombre del campo year a released_at





# PONER UN CAMPO CUSTOM
attribute :custom_field # usa un metodo para poner ese dato
def custom_field
    "el nombre de #{name}"
end






# PASAR UN CONTEXT DESDE EL CONTROLADOR
# Controller
def context
  { test: params[:test], user: 'marce' } if params[:test].present?
end

# Resourse
def self.records(options = {})
  context = options[:context]
  if context.present? && context[:test] == '1981'
    Movie.where(year: '1981')
  else
    super
  end
end




# DEFINIR LOS CAMPOS QUE NO SE MOSTRARAN
def fetchable_fields
  if !context.nil? && context[:user].present? == 'marce' && context[:user] == 'marce'
    super - [:name]
  else
    super
  end
end





#MOVIE(:ID) + REVIEWS + Only year field
/movies/44/?include=reviews&fields[movies]=year&fields[reviews]=status

#MOVIES_ALL + REVIEWS
/movies?include=reviews






















```
