# Action Cable Web sockets

```
1. generate channel
rails g channel batepapo

2. create a channel inside app/channels/yourChannelfile.rb
def subscribed
    stream_from('el mismo nombre que tu channel') 
    # Por ejemplo BatepapoChannel
end

3. Add to routes
mount ActionCable.server, at: '/cable'

4. Ahora manejas desde tu controlador del modelo que te interesa transmitir, en este caso desde el controlador de Messages en la accion create y te pasas un hash como segundo argumento con lo que quieres transmitir
def create
    message = current_user.messages.build!(message_params)
    if message.save
      ActionCable.server.broadcast('BatepapoChannel', mensaje: 'hola')
    end
end


5. Aca puedes elegir dos opciones si estas en local puedes desactivar forgery
en el archivo config/enviroment/development añades:
config.action_cable.disable_request_forgery_protection = true

o si estas en producction puedes poner los origenes permitidos en config/enviroment/production
config.action_cable.allowed_request_origins = ['*']


6. luego ya manejas el JS en tu coffee asi:
received: (data) ->
    $('#chat-box').append("<p>#{data.mensaje}</p>")
    
o en tu JS en la carpeta channel
  received(data) {
    // Called when there's incoming data on the websocket for this channel
      const chatBox = document.getElementById('chat-box')
      chatBox.insertAdjacentHTML('beforeend', `<p>${data.message}</p>`)
  }
});
    
7. y en tu vista que seria index.erb
<div id="chat-box"></div>

<%= form_with(scope: :message, url: messages_path, remote: true, method: :post) do |f| %>
  <%= f.text_field :text, placeholder: 'Enter your message', autofocus: true %>
  <%= f.submit "send message" %>

<% end %>
```

```shell
ActionCable.server.config
```

```ruby
# connention.rb
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      verified_user = env['warden'].user
      if !verified_user.nil?
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
```

```ruby
1.  "config/initializers/action_cable.rb"
if Rails.env.development?
  Rails.application.config.action_cable.allowed_request_origins =  ['http://localhost:3000', 'http://127.0.0.1:3000']
end

2. cable.yml
development:
  redis: &redis
    adapter: redis
    url: redis://localhost:6379/1

test:
  adapter: async

production:
  adapter: redis
  url: redis://localhost:6379/1
  channel_prefix: bla_production
  

3. routes.rb
mount ActionCable.server => '/cable'


4. /layouts/application.html.haml
= action_cable_meta_tag


5. rails generate channel UserInfoChannel


6. From JOB or Controller (acordate pq  te mereces este puesto, la lograte brow!)
ActionCable.server.broadcast(stream_id, mensaje: 'hola') 

7. initializer development.rb
config.action_cable.mount_path = '/cable'


```

```
1. cable.yml
development:
  adapter: redis
  url: redis://localhost:6379/1
  
2. gemfile solo necesitas
gem "redis", ">= 4.0.1"


```
