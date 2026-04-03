# Routes

# Check all routes
http://localhost:3000/rails/info/routes
# or
rails routes
#or
rails routes --expanded
#or
rails routes --expanded | grep "edit"

```ruby
# examples:
root 'users#index'
 
 
 
 
# normal
get "/users/", to: "users#index"
get "/users/:id", to: "users#show"
 
 
 
 
# nested
resources :users, only: [:index, :show, :new, :create, :edit, :update] do
  resources :posts, only: [:index, :show]
end




# COLLECTION (cuando vas a operar con todo el Modelo)
resources :pages, only: [:index] do
    collection do
      get 'test23', to: "pages#test23"
    end
end
# test23_pages_path
# /pages/test23(.:format)




# MEMBER (Cuando vas a operar con una instancia del Modelo)
resources :posts do
    member do
      get "test23"
    end
end
#test23_post_path
#/posts/:id/test23(.:format)




# SCOPE: 
# sirve para agrupar algunas rutas dentro de prefijo por ejemplo admin:
scope '/admin' do
    resources :movies
end
# movies_path	GET	/admin/movies(.:format)
#o
#tambien puedes asignarle un prefijo a los paths para que sea mas facil diferenciarlos: admin_articles_path
scope path: '/admin', as: 'admin' do
    resources :movies
end
#admin_movies_path	GET	/admin/movies(.:format)

#Tambien sirve para indicar dentro de que modulo se encuentra el controlador pero sin usar el path
scope module: 'shipper' do
  resources :shipment_finder, only: :index # Generara /shipment_finder y no /shipper/shipment_finder
end
# or
resources :shipment_finder, path: 'search', only: [:show], module: 'shipper'




# PARA USAR OTRO NOMBRE DE RUTA
resources :third_party_shipment_apps, path: 'app'
# en este caso la ruta sera /app y ya no /third_party_shipment_apps





# RESOUCE singular sirve para indicar que el atribut o nested tiene una relacion de 1 a 1 con el padre o sea no tendra un id para identificarlo
resources :posts do
    resource :like
end
# /posts/:post_id/like



#Namespace sirve para crear dentro de una carpeta Nova en la carpeta controlador y la ruta sera /nova/tito
namespace :nova do
    get :tito, to: 'nova#tito'
  end
  
  


# MODULE sirve para crear el archivo del controlador de like dentro de una carpeta posts 
# app/controllers/posts/likes_controller (class Posts::LikesController < ApplicationController)
#si vas a devolver AJAX JS tus vistas deben ir en views/posts/likes/create.js.haml
resources :posts do
    resource :like, module: :posts
end




# CONSTRAINTS
get '/posts/:slug', to: 'posts#show', constraints: { slug: /[a-z]+/ }
#or
get '/posts/:slug', to: 'posts#show', slug: /[a-z]+/

get '/posts/:slug', to: 'posts#show', constraints: ->(req) { req.params[:slug].length < 10 }

get '/posts/:slug', to: 'posts#show', constraints: SlugLength.new
# app/constraints/slug_length.rb
class SlugLength
  def matches?(request)
    request.params[:slug].length < 5
  end
end




# REDIRECT
get '/amazing', to: redirect('controller#action')


# Testear una ruta rapido create /pato
match "pato", to: -> (env) { [200, {}, ["Success!"]] }, via: :get



# Default response JSON o sea no necesitas poner /posts.json
resources :posts, defaults: { format: :json }



# Optional Segments
get 'songs(/:genre)', to: 'songs#index' # opcional con parentesis
get "songs(/:genre)", to: "songs#index", defaults: { genre: "rock" }



# SHALLOW genera nersted para index, new y create pero para los demas no
resources :courses do
  resources :lessons, shallow: true
end





# SOBREESCRIBIR :ID
resources :shipment_finder,
          path: 'search',
          only: [:show],
          module: 'shipper',
          param: :shipment_number # aca sobreescribes :id por :shipment_number
#or
get "posts/:slug", to: "posts#show", as: "post"



# Access URL Helper Methods
# controller
helpers.user_account_url
# console
app.root_path




# ROUTE TO RACK
match '/my_app', to: CustomApp::MyApp, via: :all
#or
mount CustomApp::MyApp, at: "/my_app"

# lib/custom_app/my_app.rb
module CustomApp
  module MyApp
    def self.call(env)
      [200, {}, ["<h1>My app yeah!</h1>"]]
    end
  end
end



# CONCERN
#En vez de declarar un resource nested en varios lugares asi:
resources :posts do
  resources :comments
end

resources :photos do
  resources :comments
end

# Mejor lo haces asi:
resources :posts, concerns: :commentable
resources :photos, concerns: :commentable

# Igual acepta un array resources :messages, concerns: [:commentable, :attachable, ...]
```





















