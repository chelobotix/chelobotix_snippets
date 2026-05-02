# Webhook

```shell
1. En un webhook un app externa se tiene que suscribir mandanod un request con el endpoint en que quiere que le notifiquemos.
2. el webhook se dispara con un evento, por ejemplo crear una nueva pelicula
3. el webhook mandara los datos de la nueva pelicula creada a la app externa en el formato que decida el webhook
4. la app recibira esa nueva data y la usara como vea conveniente.
```

```ruby
# Receive Webhook
def my_webhook
  request_body = request.body.read
  signature = request.headers['Header-Signature']

  signature_validator = Service::WebhookSignatureValidator.new(request_body, signature)
  signature_validator.call
  
  unless signature_validator.valid?
    render json: { error: signature_validator.errors[:error] }, status: :unauthorized
    return
  end

  begin
    request_body_json = JSON.parse(request_body)
  rescue JSON::ParserError => e
    render json: { error: "Invalid JSON body: #{e.message}" }, status: :bad_request
    return
  end
  
  # Call to service that handles Webhook
end  

```
