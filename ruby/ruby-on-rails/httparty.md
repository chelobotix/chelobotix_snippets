# Httparty

```ruby
url = "#{BASE_URL}/shipments"

      body = {
        plannedShippingDateAndTime: "#{@shipment.order.latest_ship_date.to_s[0..9]}T00:00:00 GMT+00:00",
        pickup: {
          isRequested: false
        },
      }
      
      
      # ***** SIEMPRE MANDALO EN FORMATO CON COMILLAS!!! Pq Content-Type tiene guion medio
      generate_header = {
        "Content-Type": "application/json",
        "Accept": 'application/json',
        Authorization: 'Basic ' + Base64.strict_encode64("#{@api_key}:#{@api_secret}")
      }

      response = HTTParty.post(
        "my_api/api/v1/create",
        headers: headers,
        body: body.to_json,
        timeout: 30,            # Timeout general
        open_timeout: 10,       # Timeout para abrir la conexión
        read_timeout: 20,       # Timeout específico para leer
        write_timeout: 20,      # Timeout específico para escribir
        retry_base_delay: 1,    # Delay base para reintentos
        retry_max_delay: 10,    # Delay máximo para reintentos
        retry_max_count: 3      # Número máximo de reintentos
      )
      
``` 

```ruby
# Exception
begin
  response = HTTParty.get(url, options)
rescue Net::OpenTimeout, Net::ReadTimeout => e
  puts "La solicitud ha excedido el tiempo límite: #{e.message}"
rescue SocketError => e
  puts "Problema de conexión (posible servidor caído): #{e.message}"
end

```

```ruby
# parsed_response
response.parsed_response
```
