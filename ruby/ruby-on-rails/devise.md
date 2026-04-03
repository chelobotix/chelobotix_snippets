# Devise

## Fragment 1: Basic

1. bundle add devise
2. rails generate devise:install
3. rails generate devise User
4. rails generate devise:views
5. el re tutorial! https://sdrmike.medium.com/rails-7-api-only-app-with-devise-and-jwt-for-authentication-1397211fb97c

```ruby
# Controller
before_action :authenticate_user!

# Helpers
user_signed_in?
current_user
user_session
User.current
reset_session
sign_in(User.find(8))

# Gem with bootstrap styling
gem 'devise-bootstrap-views', '~> 1.0'


#
```


```ruby
# Para anadir un campo en application_controller (username)
before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end
  
 
 
#
```


```ruby
# Devise Invitable
# acepto la invitacion
user.invitation_accepted?



#
```

```ruby
# REDIRECT inactive user
# applicationController
before_action :redirect_inactive_user, unless: :devise_controller?

def redirect_inactive_user
    path = inactive_users_index_home_index_path
    redirect_to(path) if user_signed_in? && !current_user.active && request.path != path
end



#
```



```ruby
# Anadir un dato al cookie de session devise
# initializer/warden_callbak.rb
Warden::Manager.after_authentication do |user, auth, opts|
  auth.raw_session['jwt'] = "1234"
end



#
```


```ruby

# NO AUTENTICAR ESTA ACTION
skip_before_action :authenticate_user!, only: [:nova]



#
```



```ruby
# ROUTES overwrite session or registration
rails g devise:controllers users -c sessions registrations
# esto generara los controladores y debes cambiar la route para que use estos:
devise_for :users, controllers: {
    sessions: 'users/sessions'
    passwords: 'users/passwords'
}
# o mas avanzado
Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
end



#
```

```ruby
# Email regex
Devise.email_regexp
#o
validates :email, presence: true, format: { with: Devise.email_regexp }
valid_email_regex = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i



#
```

```ruby
# PASSWORD RECOVERY ACTION (recuperar  password)
class Users::PasswordsController < Devise::PasswordsController
  # PUT /resource/password
  def update
    super
  end
  
  def after_sending_reset_password_instructions_path_for(resource_name)
    puts Rainbow('============ TEST! ============').bg(:yellow)
  end
end


devise_for :users, controllers: {
    sessions: 'users/sessions'
    passwords: 'users/passwords'
}



#
```




```ruby
# OVERWRITE AUTHENTICATE_USER
def authenticate_user!(options={})
  super(options)
end  



#
```



```ruby
# AFTER SUCCEFULL SIGN IN
def after_sign_in_path_for(resource)
  puts 'dum'
  super    
end
```


```ruby
# anular las rutas de autentificacion, por ejemplo si usas NOVA
devise_for :users, skip: :sessions
```


```ruby
# Destroy session rails 7 con turbo
<%= link_to 'Logout', destroy_user_session_path, data: { turbo_method: :delete, turbo_confirm: 'Are you sure?' } %>
```

```ruby
# PASSWORD MANAGMENT
# Desde consola:

# Verificar el password
user&.valid_password?("secret123")

# Modificar hash de password
require "bcrypt"

cost = Devise.stretches
hash = BCrypt::Password.create("111111", cost: cost)

u = User.find(102)
u.update_column(:encrypted_password, hash.to_s)

```


## Fragment 2: Uninstall

```ruby
1. Remove gem devise
2. Delete routes: devise_for :users
3. Remove from models (tipicamente esta en User)
devise :invitable, :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
4. Remove views/devise



Extra Xenvio steps
5. Crear los metodos de Devise en applicationController
helper_method :current_user, :user_signed_in?
 
def authenticate_user!
    puts 'Aca se autentificara el TOKEN'
end

def current_user
    User.find(6)
end
  
def user_signed_in?
    true
end

6. remplazar los links de devise
layout:
line 42 = link_to fa_icon('user', text: 'Profile'), root_path, class: 'dropdown-item'
line 49 = link_to fa_icon('sign-out', text: 'Sign out'), destroy_user_session_path, method: :delete, class: 'dropdown-item'
```

## Fragment 3: API-ONLY

https://github.com/waiting-for-dev/devise-jwt/wiki/Configuring-devise-for-APIs
https://sdrmike.medium.com/rails-7-api-only-app-with-devise-and-jwt-for-authentication-1397211fb97c


```ruby
Configuring devise for APIs
Marc Busqué edited this page on Feb 2, 2023 · 4 revisions
Controllers
Responding to json
In order for devise to know it can respond to json format, you need to instruct the controller layer. Usually, you will add the following in ApplicationController:

respond_to :json
If you are inheriting from ActionController::API, first you will need to bring that functionality back:

include ActionController::MimeResponds
Overriding controllers
Overriding devise controllers should be the last option to consider. However, if this is necessary, some devise actions yield the user in the crucial moment so that an override can call super and just perform the needed action with it.

For example, if you need to override SessionsController just to assign the user as an instance variable for the view, it is enough to do:

class MyApplicationSessionsController < Devise::SessionsController
  def create
    super { |resource| @resource = resource }
  end
end
Then, don't forget in your routes:

devise_for :users, controllers: { sessions: 'my_application_sessions' }
Routes
Defaulting to json as format
If you want devise routes to use json as default format (that is, you don't need to add .json at the end of the URLs), use defaults as the following:

devise_for :users, defaults: { format: :json }
Views
Validation errors format
Devise uses responders. In order to adjust validation errors coming from devise (for instance, during a sign up) to our application standards, we need to define and use a responder, which will need to implement the json_resource_errors method. As it is included in the general responder, it has access to a resource instance variable which in our case will contain the user with its errors. For instance:

module MyApplicationResponder
  protected

  def json_resource_errors
    {
      success: false,
      errors: MyApplicationErrorFormatter.call(resource.errors)
    }
  end
end
Then, in the controller you have to use it:

responders :my_application
Authentication errors format
When an authentication fails, the execution path exits our application and lands into the default devise failure application. It is responsible to render the error message.

If we want to render with our own errors format standard, we should define and use a custom failure application. It is sufficient to just inherit from the devise one and overwrite the http_auth_body method. From there, i18n_message contains the error message.

For example:

class MyApplicationFailureApp < Devise::FailureApp
  def http_auth_body
    return super unless request_format == :json
    {
      sucess: false,
      message: i18n_message
    }.to_json
  end
end
Now, in config/initializers/devise.rb we need to config Warden (the engine on top of devise) to use it:

config.warden do |manager|
  manager.failure_app = MyApplicationFailureApp
end
```
