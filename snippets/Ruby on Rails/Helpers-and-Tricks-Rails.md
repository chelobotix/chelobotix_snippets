# Helpers and Tricks Rails

```ruby
# render
render(:new, status: :unprocessable_entity)
render(json: crypto[0])



# partial
<%= render 'layouts/messages' %>
<%= render 'messages' %>
<%= render "shared/errors", obj: @user %>
# mandando las variables en un hash
render(partial: 'message', locals: { message: message})

#Estas 2 expresiones son lo mismo
render partial: "quotes/quote", locals: { quote: @quote }
render @quote





# Helper and controller method (available on views and controller)

class ApplicationController < ActionController::Base
  helper_method :current_user
  # current_user
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end





#***********
#  render subfolder from controller (en la vista tengo settings>users>new_invite_users.js.haml)
# SettingsController
def new_invite_users
  render('settings/users/new_invite_users')
end

# vista renderiza un form en la misma carpeta
























```
