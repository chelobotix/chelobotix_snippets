# Tricks

```ruby
#CONDITIONAL IN VIEW
 
#WINNER:
= if params[:action] == 'show'
 
#If you are trying to special case something in a view, you can use current_page? as in:
 
= if current_page?(:controller => 'users', :action => 'index')
#...or an action and id...
 
= if current_page?(:controller => 'users', :action => 'show', :id => 1)
#...or a named route...
 
= if current_page?(users_path)
...and
 
- if current_page?(user_path(1))
#Because current_page? requires both a controller and action, when I care about just the controller I make a current_controller? method in ApplicationController:
 
  def current_controller?(names)
    names.include?(current_controller)
  end
And use it like this:
 
- if current_controller?('users')
...which also works with multiple controller names...
 
- if current_controller?(['users', 'comments'])
  
  
  
# DIV_FOR
@post
=div_for @post do
  %p 
    Posted by
    = @post.author.name
  
 
      
  
  
//NESTED HELPERS
<%= link_to path_or_url do %>
  <%= content_tag(:span, "Click Here") %>
  <%= content_tag(:div, class: "additional-content") do %>
    <%= content_tag(:p, "Additional content goes here") %>
  <% end %>
<% end %>


```

```ruby
************************
# PARTIAL RENDER
= render 'layouts/messages'
= render 'messages'
= render "shared/errors", obj: @user
# mandando las variables en un hash
= render partial: 'message', locals: { message: message}
# sin layout
render 'post/new', layout: false

#Estas 2 expresiones son lo mismo
render partial: "quotes/quote", locals: { quote: @quote }
render @quote
render :new, layout: "mi_layout_alternativo" #envuelve la accion new dentro de un layout llamado "mi_layout_alternativo"
render 'settings/users/new_xenvio_user' #otra ubicacion
# Render y acabar la accion
render_by_warehouse(shipment) and return
return render_by_warehouse(shipment) if shipment.present?

```
```ruby

# DEFINED VARIABLE (para comprobar si una varialbe esta definida)
defined?(order).nil?
# Si es true quiere decir que no esta definida.



# ERRORS
# en la accion
@book.errors.add(:base, "Item error: #{msg}")

# en la vista iteras y buscas
- @box.errors[:base].each do |message|
      -if message.include?("Item error:")
        = message

# Un helper para ayudar
def custom_form_error(record, text)
    record.errors[:base].find { |message| message.include?(text) }
end



# Fetch with default
hash = {name: "Marce" }
user = hash.fetch(:name, "Juan")


# ENCODE WWW QUERY STRING
URI.encode_www_form(params)

# o si mandas un hash:
hash = { test: 'test1', test2: 'test2' }
query_string = 'data=' + CGI.escape(hash.to_query)

# y lo vuelves a armar asi:
query_string = 'data=test2%3Dtest2%26test%3Dtest1'
decoded_string = CGI.unescape(query_string)
encoded_hash = decoded_string.split('data=').last # => test2=test2&test=test1
Rack::Utils.parse_nested_query(encoded_hash)




# DEVELOPMENT OR PRODUCTION
Rails.env.development?


# FILTER PARAMETERS (Initializer) config/initializers/filter_parameter_logging.rb
Rails.application.config.filter_parameters += [:password]
#or scoping:
Rails.application.config.filter_parameters += [ "credit_card.number" ]
https://www.writesoftwarewell.com/how-parameter-filtering-works-in-rails/

```

```ruby
# UUID
SecureRandom.uuid #=> "1ca71cd6-08c4-4855-9381-2f41aeffe59c"
SecureRandom.alphanumeric(4).upcase # => IN5O
```

```ruby

#TEST BOOLEAN
ActiveRecord::Type::Boolean.new.type_cast_from_user(value)


# Check if column belongs to table in Data Base
YourModel.column_names.include?('nombre_del_campo')
# or
ActiveRecord::Base.connection.column_exists?(:your_table_name, :nombre_del_campo)






# STORE QUERY 
ActiveStorageAttachment.find(1)
```
      

```ruby
# Basic
= link_to "Add as friend", user_friend_path(:my_param => {:param1 => "hola"}), :method=> :put, target: '_blank'


# Block
	- link_to root_path do
      %div.flex.flex-col.items-center
        = image_tag(gravatar(@article.user, 50), alt: @article.user.username, class: 'rounded-md')
        %p By: 
          = @article.user.username


# Verificar si el path es correcto

%li.nav-item 
  = 'active' if request.path == about_path
  
  
# link_to conditional
= link_to_if false, "Add as friend", user_friend_path(:my_param => {:param1 => "hola"}), :method=> :put




# Link AJAX
= link_to "get last movie", search_result_path, remote: true, data: {disable_with: 'getting...'}


```

```ruby
//IMG
<%= image_tag 'icon.png', alt: 'icon', class: 'w-40' %>

# Public/images
<%= image_tag("/images/#{article.photo}") %>
```

```ruby
#BUTTON
# Basic
<%= button_to "Click", click_path, method: :get %>

<%= button_to "New", { action: "new" }, class: "my_class", id: "my_id" %>

# or
<%= button_to "Generate shopping list",
    user_recipes_path, class: "my_class",
    id: "my_id", method: :get,
    :onclick => "alert('Input collected!')" 
%>

# with HTML embebed
<%= f.button '<i class="bordered inverted orange icon edit"></i>'.html_safe %>
<%= @crypto.description.html_safe %>
```

```ruby
# url que hizo la solicitud al accion
#heleper method:
def extract_source_from_referer(referer)
    url_origen = referer
    uri = URI.parse(url_origen)
    params = CGI.parse(uri.query)
    params['source'].first
rescue StandardError
  nil
end
# en la accion del controlador
referer = extract_source_from_referer(request.env['HTTP_REFERER'])





#*****************
#  render subfolder from controller (en la vista tengo settings>users>new_invite_users.js.haml)
# SettingsController
def new_invite_users
  render('settings/users/new_invite_users')
end




#render otro nombre de view cuando haces ajax
respond_to do |format|
  format.js { render action: 'create2' } #en este caso va a renderizar la vista create2.js.haml
end


# USAR UN VIEW HELPER
include ActionView::Helpers::DateHelper # buscas su ubicacion nomas, re facil.
```

```ruby
# Los metodos del HELPER estan accesibles globalmente asi que poco importa el nombnre pero es mejor seguir las convensiones:
module PostHelper
  def tu_metodo_helper(record)
    puts 'dum dum'
  end
end


# Si tienes que devolver un html largo desde un metodo helper facil te creas el partial y lo invocas dedse el metodo del helper
def tu_metodo_helper
  render('rule_mailer/record_table')
end

# en la vista:
= tu_metodo_helper




















```
