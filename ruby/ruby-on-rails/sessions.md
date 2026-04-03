# Sessions

## Fragment 1: Fragment

```ruby
# basic - controller -> con esto añades el dato del usuario a la cookie luego de comprobar password
session[:user_id] = user.id

# delete
session[:user_id] = nil

#password correct?
user.authenticate("password123")  # true or false


# Con tiempo de expiracion
cookies[:test] = { value: "algún_valor", expires: 1.minute.from_now }
if session[:test] && session[:test][:expires_at] > Time.current
  #aca la borras
  
  
#session_store.rb
Bla::Application.config.session_store :cookie_store,
                                      key: '_bla_session',
                                      domain: :all,
                                      tld_length: 2,
                                      expire_after: 8.hours
```

## Fragment 2: controller

```ruby
class SessionsController < ApplicationController
  # new
  def new; end

  # new
  def create
    user = User.find_by(email: (params[:session][:email]).downcase)
    if user&.authenticate(params[:session][:password])
      session[:user_id] = user.id
      flash[:notice] = 'Logged in successfully'
      redirect_to(user)
    else
      flash.now[:alert] = 'Incorrect credentials'
      render(:new, status: :unprocessable_entity)
    end
  end

  # new
  def destroy
    session[:user_id] = nil
    flash[:notice] = 'Logged out'
    redirect_to(root_path)
  end
end

```

## Fragment 3: routes

```ruby
get 'login', to: "sessions#new"
post 'login', to: "sessions#create"
delete 'logout', to: "sessions#destroy"
```

## Fragment 4: Helpers

```ruby
class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  # current_user
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  # current_user
  def logged_in?
    !!current_user
  end

  # require_user
  def require_user
    unless logged_in?
      flash[:alert] = 'You must be logged in to view this page'
      redirect_to(login_path)
    end
  end
end
```
