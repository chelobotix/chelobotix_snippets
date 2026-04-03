# Requests RAILS

```ruby
# HEADERS
# Adjuntar al header
response.headers['Xenvio-Token'] = tu_data


# Recibir Header
request.headers['HTTP_PIPO']
request.headers.key?('pipo')
request.headers.include?('pipo')
request.headers.fetch("Key_que_buscas") # => lanza excecpion (KeyError) si no la encuentra
request.headers.fetch("Key_que_buscas", "key_por_default")
#Si quieres iterar por los headers
request.headers.each do |key, value|
  puts "#{key}: #{value}" if key.start_with?('HTTP_')
end
#Si queires ler los datos mas facil
request.headers.to_h
```


```ruby
# REQUESTS
request.host # x5dev.shipedge.com

request.domain # shipedge.com

request.subdomain # x5dev

request.base_url # https://x5dev.shipedge.com

request.url # https://x5dev.shipedge.com/nova/lopo

request.path  # /projects/rails

request.host_with_port # 127.0.0.1:3000

request.fullpath # /nova/launcher?code=ZXlKaGJHY2lPaU

request.method  # GET

request.format == "application/json"

request.ip  # "127.0.0.1"
request.remote_ip # "127.0.0.1"

request.raw_post # Lee el body sin parsear

request.request_id # "1659c4b4-1557-43dc-8883-f03968888f32"
request.uuid # "1659c4b4-1557-43dc-8883-f03968888f32"

"#{request.base_url}#{request.fullpath}" # Complete
```


```ruby
# Access HEADER FROM JS
.then((response) => {
      console.log(response.headers.get('Xenvio-Token'));
      return response.json();
    })
    .then((data) => data);
```  
    

```ruby
# ENSURE JSON REQUEST
def ensure_json_request
  unless request.format.json? && request.content_type == 'application/json'
    render(json: { error: 'Request must be JSON, change headers' }, status: :unsupported_media_type)
  end
end
```


```ruby
# TIPOS DE REQUESTS
application/json
text/html
text/javascript
application/xml
text/plain
application/pdf


.
```
