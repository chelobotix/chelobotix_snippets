# Net::HTTP URI RUBY

```ruby
Net::HTTPInformation (1xx) - Respuestas informativas
Net::HTTPSuccess (2xx) - Respuestas exitosas
Net::HTTPRedirection (3xx) - Redirecciones
Net::HTTPClientError (4xx) - Errores del cliente
Net::HTTPServerError (5xx) - Errores del servidor
```


```ruby
# Headers Response
response.to_hash
```


```ruby
# Example

require('net/http')
require('uri')

CONNECTION_ERRORS = [
  Net::OpenTimeout,
  Net::ReadTimeout,
  Errno::ECONNREFUSED,
  Errno::ECONNRESET,
  Errno::ETIMEDOUT,
  Errno::EHOSTUNREACH,
  Errno::ENETUNREACH,
  Errno::EPIPE,
  SocketError,
  OpenSSL::SSL::SSLError
].freeze
private_constant :CONNECTION_ERRORS

def call
  handle_request
  set_as_valid! if errors.blank?

rescue ::Errors::StandardServiceError => e
  set_errors({ service: self.class, code: e.code, details: e.details })
  set_as_invalid!

rescue *CONNECTION_ERRORS => e
  set_errors({ service: self.class, code: ErrorCodes::CODES[:READ_TIMEOUT_ERROR], details: e.message })
  set_as_invalid!
end

private


def handle_request
  request = build_request
  response = perform_request(request)
  handle_response(request, response)
end

def build_request
  uri = URI.parse("#{BASE_URL}/v1/shipments")
  request = Net::HTTP::Post.new(uri)
  request['Authorization'] = "Token token=#{@api_key}"
  request['Content-Type'] = 'application/json'
  request.body = build_body.to_json
  request
end

def build_body
  {
    
  }
end

def perform_request(request)
  http = Net::HTTP.new(request.uri.host, request.uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http.cert = OpenSSL::X509::Certificate.new(Rails.application.credentials.dig(Rails.env.to_sym, :bind_psp, :cert))
  http.key = OpenSSL::PKey::RSA.new(Rails.application.credentials.dig(Rails.env.to_sym, :bind_psp, :key), config['key_pass'])
  http.open_timeout = 30
  http.read_timeout = 30
  http.request(request)
end

def handle_response(request, response)
  
  unless response.is_a?(Net::HTTPSuccess)
      return
  end

  parsed_response = JSON.parse(response.body).with_indifferent_access
  build_response(parsed_response)

rescue JSON::ParserError => e
  Rails.logger.error("⛔ >>>>>-----> #{e.message}\n")
  single_error(e.message)
end
```


```ruby
# EXCEPTIONS
rescue Net::OpenTimeout, Net::ReadTimeout => e
  Rails.logger.error("Timeout al conectar con el PSP: #{e.message}")
  raise StandardError, "Timeout de conexión con el PSP"

rescue SocketError, Errno::ECONNREFUSED, Errno::EHOSTUNREACH => e
  Rails.logger.error("Error de red: #{e.message}")
  raise StandardError, "No se pudo conectar al servidor PSP"

rescue OpenSSL::SSL::SSLError, OpenSSL::PKey::RSAError => e
  Rails.logger.error("Error SSL: #{e.message}")
  raise StandardError, "Error SSL con el PSP"
```

```ruby
# VALIDATE URI
uri = URI.parse(url)
uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
```
