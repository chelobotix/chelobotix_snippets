# Forms

```ruby
# USA FORM_WITH SIEMPRE QUE PUEDAS
# 1. Con Modelo (Model-backed form)
form_with(model: @article) do |f|
  f.text_field :title
  f.submit
end

# 2. Con URL (URL-backed form)
form_with(url: search_path) do |f|
  f.text_field :query
  f.submit
end

# 3. Sin modelo ni URL (Generic form)
form_with(scope: :article) do |f|
  f.text_field :title
  f.submit
end

# Opciones adicionales comunes:
form_with(model: @article, local: true) # Deshabilita AJAX
form_with(model: @article, method: :patch) # Específica método HTTP
form_with(model: [@user, @article]) # Formularios anidados
form_with(model: @article, class: "my-form") # Añade clases CSS


# BASIC 
<%= form_with model: @user, class: "w-10/12" do |f|%>


########
# sin cambios en el modelo de la BD (session)
<%= form_with scope: :session, url: login_path, class: "w-10/12", local: true do |f|%>


######
# sin index ni show
<%= form_with(model: @user, url: users_path, method: :post, class: "ui form") do |f| %>


##########
#Para modelos polimorficos asumiendo que se tiene la ruta anidada 
<%= render partial: "comments/form", locals: {commentable: @article} %>
<%= form_with(model: [commentable, Comment.new], method: :post, class: "") do |f| %>



######
# form_for siempre se usa en un objeto y automaticamente genera los campos necesarios
<%= form_for(:session, html: {class: "w-40", role: "form"}, url: login_path %> 



######
# cuando no se trabaja con ningun modelo y se quiere procesar el query string
# cosa.com?crypto_name=bitcoin
# tambien se puede usar:
# <%= form_with url:search_crypto_path, method: "get", local: true do %>


######
# Para usar AJAX
1. ./bin/importmap pin @rails/ujs@7
2. application.js: 
import Rails from '@rails/ujs';

Rails.start();
3. 
<%= form_for(@message, html: { class: "ui", role: "form" } , url: message_path, remote: true) do |f| %>
#or
<%= form_tag search_stock_path, data: {turbo: false}, remote: true, method: :get do %>


#################
# SUBMIT

# basic
<%= f.submit "Log in" class: 'px-5' %>

# Contional
<%= f.submit(@user.new_record? ? "Sign up": "Update Account", class: 'px-5 py-3 bg-blue-600 text-white rounded-lg border-[1px] border-white') %>

###############
# FIELD
<div class="flex justify-center items-center">
    <%= f.label :password, class: 'w-40' %>
    <%= f.password_field :password, placeholder: 'Enter your password', required: true, class: 'w-50', autofocus: true %>
</div>

```
